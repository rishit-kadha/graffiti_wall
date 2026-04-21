import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Graffiti from "../components/Graffiti";
import Gallery from "../components/Gallery";

const API = import.meta.env.VITE_BACKEND_URL as string;

type Challenge = {
  date: string;
  prompt: string;
  emoji: string;
  theme: string;
};

const Challenge = () => {
  const [mode, setMode] = useState<"landing" | "revealed" | "draw" | "gallery">("landing");
  const [hasDrawn, setHasDrawn] = useState(false);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId") || "";
    
    Promise.all([
      fetch(`${API}/challenge/today`).then((r) => { if (!r.ok) throw new Error(); return r.json(); }),
      fetch(`${API}/challenge/status?sessionId=${sessionId}`).then((r) => r.ok ? r.json() : { done: false })
    ])
      .then(([chalData, statusData]) => {
        setChallenge(chalData);
        if (statusData.done) {
          setHasDrawn(true);
          setMode("gallery");
        }
      })
      .catch(() => setLoadError(true));
  }, []);

  const handleFinish = () => {
    setHasDrawn(true);
    setMode("gallery");
  };

  if (mode === "draw") {
    return (
      <Graffiti
        type="prompt"
        onPublished={handleFinish}
        onClose={() => setMode("revealed")}
      />
    );
  }

  return (
    <>
      <Nav />
      <div className="page">
        {mode === "landing" && (
          <div className="challenge-card">
            <h2>Daily Challenge</h2>
            <p style={{ color: "var(--muted)", fontSize: 14 }}>
              A new prompt every day. Draw your interpretation.
            </p>
            {loadError ? (
              <p style={{ color: "#e54050", fontSize: 14 }}>
                Could not load today's prompt. Try refreshing.
              </p>
            ) : (
              <button
                className="btn-primary"
                onClick={() => setMode("revealed")}
                disabled={!challenge}
              >
                {challenge ? "Reveal Today's Prompt" : "Loading..."}
              </button>
            )}
          </div>
        )}

        {mode === "revealed" && challenge && (
          <div className="challenge-card">
            <h2>{challenge.theme}</h2>
            <p className="challenge-prompt">{challenge.prompt}</p>
            {!hasDrawn ? (
              <button className="btn-primary" onClick={() => setMode("draw")}>
                Start Drawing
              </button>
            ) : (
              <p style={{ fontSize: 14, color: "var(--muted)" }}>
                You've already submitted today.
              </p>
            )}
            <button
              onClick={() => setMode("gallery")}
              style={{ alignSelf: "flex-start" }}
            >
              See the gallery
            </button>
          </div>
        )}

        {mode === "gallery" && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <h2>Challenge Gallery</h2>
              {challenge && (
                <span style={{ fontSize: 14, color: "var(--muted)" }}>
                  {challenge.theme}
                </span>
              )}
              {!hasDrawn && (
                <button
                  className="btn-primary"
                  style={{ marginLeft: "auto" }}
                  onClick={() => setMode("landing")}
                >
                  Take the challenge
                </button>
              )}
            </div>
            <Gallery type="prompt" />
          </>
        )}
      </div>
    </>
  );
};

export default Challenge;
