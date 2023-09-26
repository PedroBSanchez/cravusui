import React, { useState, useEffect } from "react";
import NavbarPadrao from "../components/NavbarPadrao";
import { BiSearchAlt } from "react-icons/bi";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./Pedidos.css";
import ModalCadastroPedido from "../components/ModalCadastroPedido";
import axios from "axios";
import TableOrders from "../components/TableOrders";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";

const Pedidos = () => {
  const navigate = useNavigate();
  const [modalCadastroShow, setModalCadastroShow] = useState(false);

  const [citySearch, setCitySearch] = useState("");
  const [clientSearch, setClientSearch] = useState("");

  const [orders, setOrders] = useState([]);

  const startMonth = new Date();
  startMonth.setDate(1);
  startMonth.setHours(0, 0, 0, 0);
  const [startDate, setStartDate] = useState(startMonth);
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    validateToken();
    getOrders();
  }, []);

  const validateToken = async () => {
    await verifyToken().then((validToken) => {
      if (!validToken) {
        navigate("/");
      }
    });
  };

  const getOrders = async (pageParam = 1) => {
    const token = localStorage.getItem("tokenApi");

    await axios
      .get(
        `${
          process.env.REACT_APP_BASE_URL
        }/api/orders/paginate/?page=${pageParam}&city=${citySearch}&client=${clientSearch}&startdate=${startDate.toISOString()}&enddate=${endDate.toISOString()}`,
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
          <div className="col-md-2 col-sm-4">
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
          <div className="offset-md-1 col-md-2 mt-1">
            <input
              type="text"
              className="form-control"
              placeholder="Cidade"
              onChange={(e) => setCitySearch(e.target.value)}
            />
          </div>
          <div className="col-md-2 mt-1">
            <input
              type="text"
              className="form-control"
              placeholder="Cliente"
              onChange={(e) => setClientSearch(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <ReactDatePicker
              className="form-control mt-1"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat={"dd/MM/yyyy"}
            />
          </div>

          <div className="col-md-2">
            <ReactDatePicker
              className="form-control mt-1"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat={"dd/MM/yyyy"}
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
        getOrders={getOrders}
      />
    </>
  );
};

export default Pedidos;
