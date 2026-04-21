import { useGraffiti } from "../hooks/useGraffiti";
import { useState } from "react";

type GraffitiProps = {
  type: "free" | "prompt";
  onClose: () => void;       
  onPublished?: () => void;  
};

const Graffiti = ({ type, onClose, onPublished }: GraffitiProps) => {
  const {
    canvasRef, tool, setTool,
    color, setColor, size, setSize,
    strokeCount, undo, clear, publish,
  } = useGraffiti();

  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");

  const handlePublish = async () => {
    setStatus("saving");
    try {
      const result = await publish(type);
      setStatus(result.ok ? "done" : "error");
      if (result.ok) setTimeout(() => { onPublished?.(); onClose(); }, 800);
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  const publishLabel = {
    idle:   "Publish",
    saving: "Saving...",
    done:   "Saved",
    error:  "Failed — retry",
  }[status];

  return (
    <div className="graffiti-wrap">
      <div className="graffiti-toolbar">
        <button
          className={tool === "pen" ? "btn-active" : ""}
          onClick={() => setTool("pen")}
        >
          Pen
        </button>

        <button
          className={tool === "eraser" ? "btn-active" : ""}
          onClick={() => setTool("eraser")}
        >
          Eraser
        </button>

        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          title="Pick colour"
        />

        <input
          type="range"
          min={1}
          max={40}
          value={size}
          onChange={(e) => setSize(+e.target.value)}
          title={`Size: ${size}px`}
        />

        <span className="toolbar-spacer" />

        <button onClick={undo} disabled={strokeCount === 0}>Undo</button>
        <button onClick={clear}>Clear</button>

        <button
          className="btn-primary"
          onClick={handlePublish}
          disabled={status === "saving"}
        >
          {publishLabel}
        </button>

        <button onClick={onClose}>Close</button>
      </div>

      <canvas ref={canvasRef} className="graffiti-canvas" />
    </div>
  );
};

export default Graffiti;
