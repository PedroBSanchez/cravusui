import React, { useState, useEffect } from "react";
import NavbarPadrao from "../components/NavbarPadrao";
import { BiSearchAlt } from "react-icons/bi";

import "./Pedidos.css";
import ModalCadastroPedido from "../components/ModalCadastroPedido";
import axios from "axios";
import TableOrders from "../components/TableOrders";

const Pedidos = () => {
  const [modalCadastroShow, setModalCadastroShow] = useState(false);

  const [citySearch, setCitySearch] = useState("");
  const [clientSearch, setClientSearch] = useState("");

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async (pageParam = 1) => {
    const token = localStorage.getItem("tokenApi");

    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/orders/paginate/?page=${pageParam}&city=${citySearch}&client=${clientSearch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <NavbarPadrao />
      <div className="container-fluid">
        <div className="row text-center mt-4">
          <div className="col-2">
            <h1 className="page-title">Pedidos</h1>
          </div>
          <div className="col-1">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => setModalCadastroShow(true)}
            >
              Cadastrar
            </button>
          </div>
        </div>
        <hr />
        <div className="row align-items-baseline">
          <div className="offset-md-1 col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="Cidade"
              onChange={(e) => setCitySearch(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="Cliente"
              onChange={(e) => setClientSearch(e.target.value)}
            />
          </div>
          <div className="col-md-2 col-sm-1">
            <BiSearchAlt
              size={30}
              style={{ cursor: "pointer" }}
              onClick={getOrders}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="offset-1 col-10">
            <TableOrders
              orders={orders}
              setOrders={setOrders}
              getOrders={getOrders}
            />
          </div>
        </div>
      </div>
      <ModalCadastroPedido
        show={modalCadastroShow}
        onHide={() => setModalCadastroShow(false)}
      />
    </>
  );
};

export default Pedidos;
