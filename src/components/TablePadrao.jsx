import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";

import "./TablePadrao.css";
import ModalEditItem from "./ModalEditItem";

const TablePadrao = ({ items, setItems, getItems, search, page }) => {
  const token = localStorage.getItem("tokenApi");

  const [modalEditShow, setModalEditshow] = useState(false);
  const [descriptionPlaceholder, setDescriptionPlaceholder] = useState("");
  const [valuePlaceholder, setValuePlaceholder] = useState("");
  const [amountPlaceholder, setAmountPlaceholder] = useState("");
  const [idEdit, setIdEdit] = useState();

  const handleDeleteItem = async (itemId) => {
    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/api/items/delete/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        await getItems();
        return swal({
          icon: "success",
          title: "Item deletado com sucesso",
          showConfirmButton: false,
          timer: 2500,
        });
      })
      .catch((error) => {
        console.log(error);
        return swal({
          icon: "error",
          title: "Falha ao deletar item",
          showConfirmButton: false,
          timer: 2500,
        });
      });
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
              <th scope="col">Descrição</th>
              <th scope="col">Código</th>
              <th scope="col">Preço unitário</th>
              <th scope="col">Estoque (Und)</th>

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
                    <th>R${item.value.toFixed(2)}</th>
                    <th>{item.amount}</th>
                    <th>
                      <FaPencilAlt
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setDescriptionPlaceholder(item.description);
                          setAmountPlaceholder(item.amount);
                          setValuePlaceholder(item.value.toFixed(2));
                          setIdEdit(item._id);
                          setModalEditshow(true);
                        }}
                      />{" "}
                      <FaTrashAlt
                        color="#eb6767"
                        style={{ cursor: "pointer" }}
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
      </div>
      <ModalEditItem
        onHide={() => setModalEditshow(false)}
        show={modalEditShow}
        descriptionPlaceholder={descriptionPlaceholder}
        amountPlaceholder={amountPlaceholder}
        valuePlaceholder={valuePlaceholder}
        idEdit={idEdit}
        setIdEdit={setIdEdit}
        getItems={getItems}
      />
    </>
  );
};

export default TablePadrao;
