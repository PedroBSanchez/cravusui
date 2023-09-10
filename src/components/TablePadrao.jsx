import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import Pagination from "react-bootstrap/Pagination";

import { FaTrashAlt, FaPencilAlt, FaBox } from "react-icons/fa";

import "./TablePadrao.css";
import ModalEditItem from "./ModalEditItem";
import ModalLoading from "./ModalLoading";
import { numberToReal } from "../utils/numberToReal";
import ModalEditAmountItem from "./ModalEditAmountItem";

const TablePadrao = ({
  items,
  setItems,
  getItems,
  search,
  getTotalEstoque,
}) => {
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("tokenApi");

  const [modalEditShow, setModalEditshow] = useState(false);
  const [modalEditAmountShow, setModalEditAmountShow] = useState(false);
  const [descriptionPlaceholder, setDescriptionPlaceholder] = useState("");
  const [valuePlaceholder, setValuePlaceholder] = useState("");
  const [amountPlaceholder, setAmountPlaceholder] = useState("");
  const [isActivePlaceholder, setIsActivePlaceholder] = useState(true);
  const [idEdit, setIdEdit] = useState();
  const [pageActive, setPageActive] = useState(1);

  let page = 1;

  let amountPages = [];

  for (let number = 1; number <= items.totalPages; number++) {
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

  const handleDeleteItem = async (itemId) => {
    swal({
      title: "Deseja Realmente Remover o item?",
    }).then(async (result) => {
      if (result) {
        setLoading(true);
        await axios
          .delete(
            `${process.env.REACT_APP_BASE_URL}/api/items/delete/${itemId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(async (response) => {
            await getItems(search, pageActive);
            setLoading(false);
            return swal({
              icon: "success",
              title: "Item deletado com sucesso",
              showConfirmButton: false,
              timer: 2500,
            });
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
            return swal({
              icon: "error",
              title: "Falha ao deletar item",
              showConfirmButton: false,
              timer: 2500,
            });
          });
      }
    });
  };

  const handlePageChange = (pageNumber) => {
    setPageActive(pageNumber);
    page = pageNumber;
    console.log(page);
    getItems(search, page);
  };

  return (
    <>
      <div className="table-container table-responsive p-2">
        <table
          className="table table-warning table-striped"
          style={{ borderRadius: 15 }}
        >
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Descrição</th>
              <th scope="col">Código</th>
              <th scope="col">Preço unitário</th>
              <th scope="col">Estoque (Und)</th>
              <th scope="col">Total</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {items.itemsPaginate &&
              items.itemsPaginate.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <th>{item.description}</th>
                    <th>
                      <u>{item.code}</u>
                    </th>
                    <th>{numberToReal(item.value)}</th>
                    <th>{item.amount}</th>
                    <th>{numberToReal(item?.amount * item?.value)}</th>
                    <th>
                      <FaBox
                        style={{
                          cursor: "pointer",
                          marginRight: "5px",
                          color: "rgb(34, 94, 204)",
                        }}
                        onClick={() => {
                          setDescriptionPlaceholder(item.description);
                          setAmountPlaceholder(item.amount);
                          setValuePlaceholder(item.value.toFixed(2));
                          setIdEdit(item._id);
                          setModalEditAmountShow(true);
                        }}
                      />
                      <FaPencilAlt
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setDescriptionPlaceholder(item.description);
                          setAmountPlaceholder(item.amount);
                          setValuePlaceholder(item.value.toFixed(2));
                          setIdEdit(item._id);
                          setModalEditshow(true);
                          setIsActivePlaceholder(item.isActive);
                        }}
                      />
                      <FaTrashAlt
                        color="#eb6767"
                        style={{ cursor: "pointer", marginLeft: "5px" }}
                        onClick={() => {
                          handleDeleteItem(item._id);
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
      <ModalEditItem
        onHide={() => setModalEditshow(false)}
        show={modalEditShow}
        descriptionPlaceholder={descriptionPlaceholder}
        valuePlaceholder={valuePlaceholder}
        isActivePlaceholder={isActivePlaceholder}
        setIsActivePlaceholder={setIsActivePlaceholder}
        idEdit={idEdit}
        setIdEdit={setIdEdit}
        getItems={getItems}
        currentPage={page}
        currentSearch={search}
      />
      <ModalEditAmountItem
        show={modalEditAmountShow}
        onHide={() => {
          setModalEditAmountShow(false);
        }}
        descriptionPlaceholder={descriptionPlaceholder}
        amountPlaceholder={amountPlaceholder}
        idEdit={idEdit}
        setIdEdit={setIdEdit}
        getItems={getItems}
        currentPage={page}
        currentSearch={search}
      />
      <ModalLoading show={loading} onHide={() => setLoading(false)} />
    </>
  );
};

export default TablePadrao;
