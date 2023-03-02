import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./screens/Login";
import Produtos from "./screens/Produtos";
import Pedidos from "./screens/Pedidos";
import Clientes from "./screens/Clientes";
import Vendas from "./screens/Vendas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/vendas" element={<Vendas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
