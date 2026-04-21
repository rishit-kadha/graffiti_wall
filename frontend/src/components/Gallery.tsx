import { useEffect, useRef, useState } from "react";

type Tile = {
  id: string;
  imageUrl: string;
  type: "free" | "prompt";
  likes: number;
};

type GalleryProps = {
  type: "free" | "prompt" | "all";
};

const getSessionId = (): string => {
  let id = localStorage.getItem("sessionId");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("sessionId", id);
  }
  return id;
};

const SESSION_ID = getSessionId();
const API = import.meta.env.VITE_BACKEND_URL as string;

const Gallery = ({ type }: GalleryProps) => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [selected, setSelected] = useState<Tile | null>(null);
  const [likedIds, setLikedIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem("likedTiles");
      return stored ? new Set(JSON.parse(stored) as string[]) : new Set();
    } catch {
      return new Set();
    }
  });

  const inFlight = useRef<Set<string>>(new Set());
 
  const [, forceRender] = useState(0);

  const limit = 20;

  const fetchTiles = async () => {
    try {
      const url =
        type === "all"
          ? `${API}/tiles?limit=${limit}`
          : `${API}/tiles/${type}`;

      const res = await fetch(url);
      if (!res.ok) return;

      const data = await res.json();
      setTiles([...data].sort((a, b) => b.likes - a.likes));
    } catch (err) {
      console.error("Error fetching tiles", err);
    }
  };

  useEffect(() => { fetchTiles(); }, [type]);

  useEffect(() => {
    try {
      localStorage.setItem("likedTiles", JSON.stringify([...likedIds]));
    } catch {  }
  }, [likedIds]);

  const handleLike = async (tileId: string) => {
    if (inFlight.current.has(tileId)) return;
    inFlight.current.add(tileId);
    forceRender((n) => n + 1);

    const wasLiked = likedIds.has(tileId);
    const delta = wasLiked ? -1 : 1;

    setLikedIds((prev) => {
      const next = new Set(prev);
      wasLiked ? next.delete(tileId) : next.add(tileId);
      return next;
    });
    setTiles((prev) =>
      prev.map((t) =>
        t.id === tileId ? { ...t, likes: Math.max(0, t.likes + delta) } : t,
      ),
    );

    try {
      const res = await fetch(`${API}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tileId, sessionId: SESSION_ID }),
      });

      if (res.ok) {
        const { likes } = await res.json();
        setTiles((prev) =>
          prev.map((t) => (t.id === tileId ? { ...t, likes } : t)),
        );
      } else {
        rollback(tileId, wasLiked, delta);
      }
    } catch {
      rollback(tileId, wasLiked, delta);
      fetchTiles();
    } finally {
      inFlight.current.delete(tileId);
      forceRender((n) => n + 1);
    }
  };

  const rollback = (tileId: string, wasLiked: boolean, delta: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      wasLiked ? next.add(tileId) : next.delete(tileId);
      return next;
    });
    setTiles((prev) =>
      prev.map((t) =>
        t.id === tileId ? { ...t, likes: Math.max(0, t.likes - delta) } : t,
      ),
    );
  };

  if (tiles.length === 0) {
    return (
      <p className="status-bar">Nothing here yet — be the first to draw.</p>
    );
  }

  return (
    <>
      <div className="gallery-grid">
        {tiles.map((tile) => {
          const liked = likedIds.has(tile.id);
          const pending = inFlight.current.has(tile.id);
          return (
            <div key={tile.id} className="gallery-tile">
              <img
                src={tile.imageUrl}
                alt="graffiti tile"
                onClick={() => setSelected(tile)}
              />
              <div className="gallery-tile-footer">
                <button
                  className={`btn-like${liked ? " liked" : ""}`}
                  onClick={() => handleLike(tile.id)}
                  disabled={pending}
                  aria-label={liked ? "Unlike" : "Like"}
                >
                  {liked ? "❤️" : "🤍"} {tile.likes}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <img src={selected.imageUrl} alt="graffiti full view" />
        </div>
      )}
    </>
  );
};

export default Gallery;
