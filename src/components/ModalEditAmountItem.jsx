import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import swal from "sweetalert";

import "./ModalEditAmountItem.css";

const ModalEditAmountItem = (props) => {
  const [newAmount, setNewAmount] = useState(null);

  const handleEditAmount = async () => {
    console.log(newAmount);
    if (newAmount == null || newAmount < 0) {
      return swal({
        icon: "warning",
        title: "Nova Quantidade Inválida",
        showConfirmButton: true,
      });
    }

    const token = localStorage.getItem("tokenApi");
    const options = {
      method: "PUT",
      url: `${process.env.REACT_APP_BASE_URL}/api/items/editamount`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        id: props.idEdit,
        amount: newAmount,
      },
    };

    await axios
      .request(options)
      .then(async (response) => {
        swal({
          icon: "success",
          title: "Estoque alterado com sucesso",
          showConfirmButton: false,
          timer: 2500,
        });

        setNewAmount(null);
        await props.getItems(props.currentSearch, props.currentPage);
        props.setIdEdit(null);
        props.onHide();
        return;
      })
      .catch((error) => {
        console.log(error);
        return swal({
          icon: "error",
          title: "Falha ao editar estoque produto",
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
          Editar Estoque
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-6">
            <label>Produto</label>
            <input
              className="form-control"
              disabled
              placeholder={props.descriptionPlaceholder}
            />
          </div>
          <div className="col-6">
            <label>Quantidade em Estoque</label>
            <input
              className="form-control"
              disabled
              placeholder={props.amountPlaceholder}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <Form.Label>Nova Quantidade</Form.Label>
            <Form.Control
              type="number"
              value={newAmount}
              onChange={(e) => {
                setNewAmount(e.target.value);
              }}
              min="0"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={() => {
            handleEditAmount();
          }}
        >
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditAmountItem;
