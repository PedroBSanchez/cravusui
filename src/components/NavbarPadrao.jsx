import Container from "react-bootstrap/Container";

import "./NavbarPadrao.css";

import { useNavigate } from "react-router-dom";
function NavbarPadrao() {
  const navigate = useNavigate();
  const handleNavigate = () => {};

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <a
          className="navbar-brand navbar-link navbar-link-ok"
          style={{ color: "white" }}
        >
          Cravus
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link navbar-link-ok" style={{ color: "white" }}>
                Produtos
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarPadrao;
