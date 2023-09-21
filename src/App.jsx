import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import Login from "./screens/Login";
import Produtos from "./screens/Produtos";
import Pedidos from "./screens/Pedidos";
import Clientes from "./screens/Clientes";
import Vendas from "./screens/Vendas";
import Financeiro from "./screens/Financeiro";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/vendas" element={<Vendas />} />
        <Route path="/financeiro" element={<Financeiro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
