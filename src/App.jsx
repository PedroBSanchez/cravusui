import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./screens/Login";
import Produtos from "./screens/Produtos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/produtos" element={<Produtos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
