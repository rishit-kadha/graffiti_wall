import { useEffect, useRef, useState } from "react";

type Tool = "pen" | "eraser";

interface Point { x: number; y: number }
interface Stroke { type: Tool; points: Point[]; color: string; size: number }

export const useGraffiti = () => {
  const cloudName    = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
  const backendUrl   = import.meta.env.VITE_BACKEND_URL;

  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const isDrawing     = useRef(false);
  const currentStroke = useRef<Stroke | null>(null);

  const snapshots = useRef<ImageData[]>([]);

  const [tool,  setTool]  = useState<Tool>("pen");
  const [color, setColor] = useState("#000000");
  const [size,  setSize]  = useState(6);
 
  const [strokeCount, setStrokeCount] = useState(0);

  const getCtx = () => {
    const canvas = canvasRef.current;
    return canvas ? canvas.getContext("2d") : null;
  };

  const getPos = (canvas: HTMLCanvasElement, clientX: number, clientY: number): Point => {
    const rect = canvas.getBoundingClientRect();

    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const pushSnapshot = () => {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;
    snapshots.current.push(
      ctx.getImageData(0, 0, canvas.width, canvas.height),
    );
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr  = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width  = rect.width  * dpr;
    canvas.height = rect.height * dpr;
   
    ctx.scale(dpr, dpr);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, rect.width, rect.height);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const beginStroke = (clientX: number, clientY: number) => {
      pushSnapshot();
      const pos = getPos(canvas, clientX, clientY);
      isDrawing.current = true;
      currentStroke.current = { type: tool, points: [pos], color, size };
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    };

    const continueStroke = (clientX: number, clientY: number) => {
      if (!isDrawing.current || !currentStroke.current) return;
      const pos = getPos(canvas, clientX, clientY);
      currentStroke.current.points.push(pos);
     
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
      ctx.lineWidth   = size;
      ctx.lineCap     = "round";
      ctx.lineJoin    = "round";
      ctx.stroke();
     
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    };

    const endStroke = () => {
      if (!isDrawing.current) return;
      isDrawing.current = false;
      currentStroke.current = null;
      setStrokeCount((n) => n + 1);
    };

    const onMouseDown  = (e: MouseEvent) => beginStroke(e.clientX, e.clientY);
    const onMouseMove  = (e: MouseEvent) => continueStroke(e.clientX, e.clientY);
    const onMouseUp    = () => endStroke();
    const onMouseLeave = () => { if (isDrawing.current) endStroke(); };

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const t = e.touches[0];
      beginStroke(t.clientX, t.clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const t = e.touches[0];
      continueStroke(t.clientX, t.clientY);
    };
    const onTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      endStroke();
    };

    canvas.addEventListener("mousedown",  onMouseDown);
    canvas.addEventListener("mousemove",  onMouseMove);
    canvas.addEventListener("mouseup",    onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove",  onTouchMove,  { passive: false });
    canvas.addEventListener("touchend",   onTouchEnd,   { passive: false });

    return () => {
      canvas.removeEventListener("mousedown",  onMouseDown);
      canvas.removeEventListener("mousemove",  onMouseMove);
      canvas.removeEventListener("mouseup",    onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove",  onTouchMove);
      canvas.removeEventListener("touchend",   onTouchEnd);
    };
  }, [tool, color, size]);

  const undo = () => {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx || snapshots.current.length === 0) return;

    const prev = snapshots.current.pop()!;
    ctx.putImageData(prev, 0, 0);
    setStrokeCount((n) => Math.max(0, n - 1));
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;
    snapshots.current = [];
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setStrokeCount(0);
  };

  const publish = async (type: "free" | "prompt") => {
    const canvas = canvasRef.current;
    if (!canvas) return { ok: false };

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/png"),
    );
    if (!blob) return { ok: false };

    try {
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", uploadPreset);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData },
      );

      if (!res.ok) {
        console.error("Cloudinary upload failed:", await res.text());
        return { ok: false };
      }

      const data = await res.json();
      if (!data.secure_url) return { ok: false };

      const saveRes = await fetch(`${backendUrl}/publish`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          imageUrl: data.secure_url, 
          type, 
          sessionId: localStorage.getItem("sessionId") 
        }),
      });

      if (!saveRes.ok) {
        console.error("Backend publish failed:", await saveRes.text());
        return { ok: false };
      }

      return await saveRes.json();
    } catch (err) {
      console.error("Publish error:", err);
      return { ok: false };
    }
  };

  return {
    canvasRef, tool, setTool, color, setColor,
    size, setSize, strokeCount, undo, clear, publish,
  };
};
