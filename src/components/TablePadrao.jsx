import React from "react";

import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";

import "./TablePadrao.css";

const TablePadrao = ({ items, setItems, getItems }) => {
  const handleDeleteItem = async (itemId) => {
    console.log(itemId);
  };

  return (
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
            <th scope="col">Estoque (Und)</th>
            <th scope="col">Preço unitário</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {items.itemsPaginate &&
            items.itemsPaginate.map((item, index) => {
              console.log(item);
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <th>{item.description}</th>
                  <th>{item.code}</th>
                  <th>{item.amount}</th>
                  <th>R${item.value.toFixed(2)}</th>
                  <th>
                    <FaPencilAlt style={{ cursor: "pointer" }} />{" "}
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
  );
};

export default TablePadrao;
