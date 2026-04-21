import "./App.css";
import Nav from "./components/Nav";
import Gallery from "./components/Gallery";

function App() {
  return (
    <>
      <Nav />
      <div className="page">
        <h2>Today's Gallery</h2>
        <Gallery type="all" />
      </div>
    </>
  );
}

export default App;
