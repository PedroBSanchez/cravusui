import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./screens/Login";
import Produtos from "./screens/Produtos";
import Pedidos from "./screens/Pedidos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/pedidos" element={<Pedidos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
