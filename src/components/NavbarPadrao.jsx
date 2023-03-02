import Container from "react-bootstrap/Container";

import "./NavbarPadrao.css";

import sewingMachineImage from "../assets/sewing.png";

import { useNavigate } from "react-router-dom";
function NavbarPadrao() {
  const navigate = useNavigate();

  const handleNavigate = (pageUrl) => {
    navigate(`/${pageUrl}`);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <img src={sewingMachineImage} alt="Bootstrap" width="35" height="35" />
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav p-2">
            <li className="nav-item">
              <a
                className="nav-link navbar-link-ok"
                style={{ color: "white" }}
                onClick={() => {
                  handleNavigate("produtos");
                }}
              >
                Produtos
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link navbar-link-ok"
                style={{ color: "white" }}
                onClick={() => {
                  handleNavigate("pedidos");
                }}
              >
                Pedidos
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link navbar-link-ok"
                style={{ color: "white" }}
                onClick={() => {
                  handleNavigate("clientes");
                }}
              >
                Clientes
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link navbar-link-ok"
                style={{ color: "white" }}
                onClick={() => {
                  handleNavigate("vendas");
                }}
              >
                Vendas
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarPadrao;
