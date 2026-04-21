import { useState } from "react";
import Nav from "../components/Nav";
import Gallery from "../components/Gallery";
import Create from "../components/Create";
import Graffiti from "../components/Graffiti";

const Freeplay = () => {
  const [mode, setMode] = useState<"gallery" | "draw">("gallery");

  if (mode === "draw") {
    return <Graffiti type="free" onClose={() => setMode("gallery")} />;
  }

  return (
    <>
      <Nav />
      <div className="page">
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <h2>Freeplay</h2>
          <Create type="free" onClick={() => setMode("draw")} />
        </div>
        <Gallery type="free" />
      </div>
    </>
  );
};

export default Freeplay;
