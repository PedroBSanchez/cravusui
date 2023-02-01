import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import swal from "sweetalert";
import { BsPlusSquareFill } from "react-icons/bs";

import "./ModalCadastroPedido.css";
import TableOrderItems from "./TableOrderItems";

const ModalCadastroPedido = (props) => {
  const [newCity, setNewCity] = useState();
  const [newClient, setNewClient] = useState();
  const [newItems, setNewItems] = useState([]);

  const [orderPrice, setOrderPrice] = useState(0);

  const [newItemCode, setNewItemCode] = useState();
  const [newItemDescription, setNewItemDescription] = useState();
  const [newItemAmount, setNewItemAmount] = useState();
  const [newItemValue, setNewItemValue] = useState();

  const [allItems, setAllItems] = useState([
    { code: 1, description: "Teste", value: 30.5 },
    { code: 2, description: "Safe", value: 30.5 },
    { code: 3, description: "Xesque", value: 30.5 },
  ]);

  //Get all items to implements dropdown

  const getItemsOrders = async () => {
    const token = localStorage.getItem("tokenApi");
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/items/getall`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setNewItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    //Pegar all items
    getItemsOrders();
  }, []);

  const handleAddItem = () => {
    let produtoJaAdicionado = false;
    console.log(newItemCode);
    if (
      !newItemCode ||
      !newItemDescription ||
      !newItemAmount ||
      !newItemValue
    ) {
      return swal({
        icon: "error",
        title: "Campos inválidos",
        showConfirmButton: false,
        timer: 2500,
      });
    }

    //Verificar se produto já foi adicionado

    for (let index = 0; index < newItems.length; index++) {
      if (newItems[index].code == newItemCode) {
        produtoJaAdicionado = true;
      }
    }

    if (produtoJaAdicionado) {
      return swal({
        icon: "error",
        title: "Produto já adicionado",
        showConfirmButton: false,
        timer: 2500,
      });
    }

    setNewItems([
      ...newItems,
      {
        code: newItemCode,
        description: newItemDescription,
        amount: newItemAmount,
        value: newItemValue,
      },
    ]);

    //Zerar valores + campo de produto e quantidade
    setNewItemCode(null);
    setNewItemDescription(null);
    setNewItemValue(null);
    setNewItemAmount(null);

    document.getElementById("produtoInput").value = null;
    document.getElementById("quantidadeInput").value = null;

    setOrderPrice(orderPrice + newItemValue);
  };

  const handleOptionNewItem = (val) => {
    if (val && val != "" && val.includes("-")) {
      val = val.split("-");
      if (val.length != 3) {
        return swal({
          icon: "error",
          title: "Produto inválido",
          showConfirmButton: false,
          timer: 2500,
        });
      }

      val[0] = parseInt(val[0].trim());

      val[1] = val[1].trim();

      val[2] = val[2].trim();
      val[2] = val[2].replace("R$", "");

      val[2] = parseFloat(val[2]);

      //Definir valores

      setNewItemCode(val[0]);
      setNewItemDescription(val[1]);
      setNewItemValue(val[2]);
    }
  };

  const handleNewOrder = async () => {};

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cadastro de Pedido
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col">
            <Form.Label>Cidade</Form.Label>
            <Form.Control
              id="cidadeInput"
              type="text"
              placeholder=""
              onChange={(e) => {
                setNewCity(e.target.value);
              }}
            />
          </div>
          <div className="col">
            <Form.Label>Cliente</Form.Label>
            <Form.Control
              id="clienteInput"
              type="text"
              placeholder=""
              onChange={(e) => {
                setNewClient(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="row mt-2 align-items-end">
          <div className="col-md-6">
            <Form.Label>Produto</Form.Label>
            <Form.Control
              id="produtoInput"
              type="text"
              placeholder=""
              list="data"
              onChange={(e) => {
                handleOptionNewItem(e.target.value);
              }}
            />
            <datalist id="data" style={{ width: "100%" }}>
              {allItems.length > 0 &&
                allItems.map((item) => {
                  return (
                    <option>
                      {item.code} - {item.description} - R${item.value}
                    </option>
                  );
                })}
            </datalist>
          </div>
          <div className="col-md-2">
            <Form.Label>Quantidade</Form.Label>
            <Form.Control
              id="quantidadeInput"
              min={1}
              type="number"
              placeholder=""
              onChange={(e) => setNewItemAmount(e.target.value)}
            />
          </div>
          <div className="col-2">
            <BsPlusSquareFill
              className="add-item-icon"
              size={37}
              onClick={handleAddItem}
            />
          </div>
        </div>
        <hr />
        <div className="row mt-2">
          <Modal.Title id="contained-modal-title-vcenter">
            Itens do Pedido
          </Modal.Title>
          <div className="col">
            <TableOrderItems orderItems={newItems} />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col">
            <p>
              <u>
                <b>Total R${orderPrice.toFixed(2)}</b>
              </u>
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => handleNewOrder()}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCadastroPedido;
