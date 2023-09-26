import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import swal from "sweetalert";
import { BsPlusSquareFill } from "react-icons/bs";

import "./ModalCadastroPedido.css";
import TableOrderItems from "./TableOrderItems";
import ModalLoading from "./ModalLoading";

const ModalCadastroPedido = (props) => {
  const [loading, setLoading] = useState(false);
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

  const [allClients, setAllClients] = useState([]);

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
        setAllItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getClients = async () => {
    const token = localStorage.getItem("tokenApi");

    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/clients/getall`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAllClients(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    //Pegar all items
    getItemsOrders();
    getClients();
  }, []);

  const handleAddItem = () => {
    let produtoJaAdicionado = false;
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

    setOrderPrice(orderPrice + newItemValue * newItemAmount);
  };

  const handleRemoveItem = (index) => {
    //slice(index, 1)

    swal({
      title: `Deseja realmente remover ${newItems[index].description} do pedido?`,
      icon: "warning",
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        setOrderPrice(
          orderPrice - newItems[index].value * parseInt(newItems[index].amount)
        );
        let arrayRemoveItem = newItems;

        arrayRemoveItem.splice(index, 1);

        setNewItems(arrayRemoveItem);
      }
    });
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

  const handleNewOrder = async () => {
    const token = localStorage.getItem("tokenApi");

    const arrayItems = [];

    if (
      newCity == null ||
      newCity == "" ||
      newClient == null ||
      newClient == "" ||
      newItems.length <= 0
    ) {
      return swal({
        icon: "error",
        title: "Campos obrigatórios",
        showConfirmButton: false,
        timer: 2500,
      });
    }

    const clientObject = JSON.parse(newClient);

    newItems.forEach((element) => {
      arrayItems.push({ code: element.code, amount: parseInt(element.amount) });
    });

    const options = {
      url: `${process.env.REACT_APP_BASE_URL}/api/orders/create`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        city: newCity,
        client: clientObject._id,
        items: arrayItems,
      },
    };

    setLoading(true);
    await axios
      .request(options)
      .then((response) => {
        //Zerar valores
        zerarInputs();
        props.onHide();
        props.getOrders();
        setLoading(false);
        return swal({
          icon: "success",
          title: "Pedido criado com sucesso",
          showConfirmButton: false,
          timer: 2500,
        });
      })
      .catch((error) => {
        console.log(error);
        zerarInputs();
        props.onHide();
        setLoading(false);
        return swal({
          icon: "error",
          title: "Falha ao criar pedido",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  const zerarInputs = () => {
    setNewCity(null);
    setNewClient(null);
    setNewItems([]);
    setOrderPrice(0);

    setNewItemAmount(null);
    setNewItemCode(null);
    setNewItemDescription(null);
    setNewItemValue(null);

    document.getElementById("cidadeInput").value = null;
    document.getElementById("clienteInput").value = null;
    document.getElementById("produtoInput").value = null;
    document.getElementById("quantidadeInput").value = null;
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
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
              <Form.Select
                id="clienteInput"
                onChange={(e) => {
                  setNewClient(e.currentTarget.value);
                }}
              >
                <option disabled selected value={null}>
                  Selecione um cliente
                </option>
                {allClients.map((element, index) => {
                  let valueObject = {
                    _id: element?._id,
                    name: element?.name,
                    phone: element?.phone,
                  };
                  return (
                    <option key={index} value={JSON.stringify(valueObject)}>
                      {element?.name}
                    </option>
                  );
                })}
              </Form.Select>
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
                  allItems.map((item, index) => {
                    return (
                      <option key={index}>
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
              <TableOrderItems
                orderItems={newItems}
                handleRemoveItem={handleRemoveItem}
              />
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
      <ModalLoading show={loading} onHide={() => setLoading(false)} />
    </>
  );
};

export default ModalCadastroPedido;
