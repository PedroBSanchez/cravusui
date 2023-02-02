import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import Pagination from "react-bootstrap/Pagination";

import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";

import "./TableOrders.css";
import ModalOrderInfo from "./ModalOrderInfo";

const TableOrders = ({ orders, setOrders, getOrders }) => {
  const [modalInfoShow, setModalInfoShow] = useState(false);

  const [orderInfo, setOrderInfo] = useState({});

  const [pageActive, setPageActive] = useState(1);

  let page = 1;

  let amountPages = [];

  for (let number = 1; number <= orders.totalPages; number++) {
    if (number === pageActive) {
      page = pageActive;
    }
    amountPages.push(
      <Pagination.Item
        key={number}
        active={number === pageActive}
        onClick={() => {
          handlePageChange(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  const handlePageChange = (pageNumber) => {
    setPageActive(pageNumber);
    page = pageNumber;
    console.log(page);
    getOrders(page);
  };

  const handleDeleteOrder = async (id) => {
    console.log(id);
    const token = localStorage.getItem("tokenApi");

    swal({
      title: "Deseja realmente deletar pedido?",
      icon: "warning",
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await axios
          .delete(`${process.env.REACT_APP_BASE_URL}/api/orders/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            getOrders(page);
            return swal({
              icon: "success",
              title: "Pedido deletado com sucesso",
              showConfirmButton: false,
              timer: 2500,
            });
          })
          .catch((error) => {
            console.log(error);
            return swal({
              icon: "error",
              title: "Falha ao deletar pedido",
              showConfirmButton: false,
              timer: 2500,
            });
          });
      }
    });
  };

  const handleOpenModalInfo = (order) => {
    setOrderInfo(order);
    setModalInfoShow(true);
  };

  return (
    <>
      <div className="table-container p-2">
        <table
          className="table table-warning table-striped"
          style={{ borderRadius: 15 }}
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Cidade</th>
              <th scope="col">Cliente</th>
              <th scope="col">Vendedor</th>
              <th scope="col">Total</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {orders.ordersPaginate &&
              orders.ordersPaginate.map((order, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <th>{order.city}</th>
                    <th>
                      <u>{order.client}</u>
                    </th>
                    <th>{order.seller.name}</th>
                    <th>R${order.total.toFixed(2)}</th>
                    <th>
                      <BiSearchAlt
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleOpenModalInfo(order);
                        }}
                      />{" "}
                      <FaTrashAlt
                        color="#eb6767"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          handleDeleteOrder(order._id);
                        }}
                      />
                    </th>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <div className="row mt-2 text-center justify-content-center">
          <div className="col-1">
            <Pagination>{amountPages}</Pagination>
          </div>
        </div>
      </div>
      <ModalOrderInfo
        show={modalInfoShow}
        onHide={() => {
          setModalInfoShow(false);
        }}
        order={orderInfo}
      />
    </>
  );
};

export default TableOrders;
