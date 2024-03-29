import React from "react";

import { FaTrashAlt } from "react-icons/fa";
import { numberToReal } from "../utils/numberToReal";

import "./TableOrderItems.css";

const TableOrderItems = ({ orderItems, handleRemoveItem }) => {
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
            <th scope="col">Preço unitário</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {orderItems &&
            orderItems.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <th>{item.description}</th>
                  <th>
                    <u>{item.code}</u>
                  </th>
                  <th>{numberToReal(item.value)}</th>
                  <th>{item.amount}</th>
                  <th>
                    <FaTrashAlt
                      color="#eb6767"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleRemoveItem(index);
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

export default TableOrderItems;
