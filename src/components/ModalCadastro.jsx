import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import swal from "sweetalert";

const ModalCadastro = (props) => {
  const [newDescription, setNewDescription] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const handleNewItem = async () => {
    if (newDescription == "" || newValue == "" || newAmount == "") {
      return swal({
        icon: "warning",
        title: "Campos obrigatórios",
        showConfirmButton: false,
        timer: 2500,
      });
    }

    if (newValue <= 0 || newAmount <= 0) {
      return swal({
        icon: "warning",
        title: "Valores inválidos",
        showConfirmButton: false,
        timer: 2500,
      });
    }

    //Fazer requisição
    const token = localStorage.getItem("tokenApi");

    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/api/items/create`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        description: newDescription,
        value: newValue,
        amount: newAmount,
      },
    };

    await axios
      .request(options)
      .then(async (response) => {
        swal({
          icon: "success",
          title: "Produto Cadastrado com sucesso",
          showConfirmButton: false,
          timer: 2500,
        });
        zerarValores();
        props.onHide();
        await props.getItems();
      })
      .catch((error) => {
        return swal({
          icon: "error",
          title: "Falha ao cadastrar produto",
          showConfirmButton: false,
          timer: 2500,
        });
      });
  };

  const zerarValores = () => {
    setNewDescription("");
    setNewValue("");
    setNewAmount("");
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cadastro de Produto
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              onChange={(e) => {
                setNewDescription(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-6 col-sm-5">
            <Form.Label>Preço</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              onChange={(e) => {
                setNewValue(e.target.value);
              }}
            />
          </div>
          <div className="col-md-6 col-sm-5">
            <Form.Label>Estoque</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              onChange={(e) => {
                setNewAmount(e.target.value);
              }}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => handleNewItem()}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCadastro;
