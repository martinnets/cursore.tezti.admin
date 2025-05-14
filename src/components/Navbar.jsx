import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">TEZTI</div>
        <div className="nav-links">
          <Link to="/">Inicio</Link>
          <Link to="/scorm">Scorm</Link>
          <Link to="/cognifit">Cognifit</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;