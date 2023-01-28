import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import swal from "sweetalert";

const ModalEditItem = (props) => {
  const [newDescription, setNewDescription] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newAmount, setNewAmount] = useState("");

  console.log(props.idEdit);
  const handleEditItem = async () => {
    const descriptionEdit =
      newDescription && newDescription != ""
        ? newDescription
        : props.descriptionPlaceholder;
    const valueEdit =
      newValue && newValue != "" ? newValue : props.valuePlaceholder;
    const amountEdit =
      newAmount && newAmount != "" ? newAmount : props.amountPlaceholder;

    const token = localStorage.getItem("tokenApi");
    const options = {
      method: "PUT",
      url: `${process.env.REACT_APP_BASE_URL}/api/items/edit`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        id: props.idEdit,
        description: descriptionEdit,
        value: valueEdit,
        amount: amountEdit,
      },
    };

    await axios
      .request(options)
      .then(async (response) => {
        swal({
          icon: "success",
          title: "Produto editado com suceso",
          showConfirmButton: false,
          timer: 2500,
        });
        console.log(props.currentPage);
        await props.getItems(props.currentSearch, props.currentPage);
        props.setIdEdit(null);
        props.onHide();
        return;
      })
      .catch((error) => {
        console.log(error);
        return swal({
          icon: "error",
          title: "Falha ao editar produto",
          showConfirmButton: false,
          timer: 2500,
        });
      });
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
          Editar Produto
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>*Ajustar apenas campos desejados</p>
        <div className="row">
          <div className="col">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="text"
              placeholder={props.descriptionPlaceholder}
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
              placeholder={`R$${props.valuePlaceholder}`}
              min={0}
              onChange={(e) => {
                setNewValue(e.target.value);
              }}
            />
          </div>
          <div className="col-md-6 col-sm-5">
            <Form.Label>Estoque</Form.Label>
            <Form.Control
              type="number"
              min={0}
              placeholder={props.amountPlaceholder}
              onChange={(e) => {
                setNewAmount(e.target.value);
              }}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => handleEditItem()}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditItem;
