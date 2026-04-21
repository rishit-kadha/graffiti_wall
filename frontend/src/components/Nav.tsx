import { TimeUntilReset } from "./TimeUntilReset";
import { Link } from "react-router";

const Nav = () => {
  return (
    <header className="nav">
      <Link to="/" className="nav-title architects-daughter-regular">
        Graffiti
      </Link>

      <nav>
        <ul className="nav-links">
          <li><Link to="/freeplay">Freeplay</Link></li>
          <li><Link to="/challenge">Challenge</Link></li>
        </ul>
      </nav>

      <span className="nav-reset">
        <TimeUntilReset />
      </span>
    </header>
  );
};

export default Nav;
