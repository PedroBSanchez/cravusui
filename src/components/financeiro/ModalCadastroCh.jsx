import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import swal from "sweetalert";

import ReactDatePicker from "react-datepicker";

const ModalCadastroCh = (props) => {
  const [newClient, setNewClient] = useState("");
  const [newValue, setNewValue] = useState();
  const [newDepositDate, setNewDepositDate] = useState();

  const handleCreateCh = async () => {
    if (newClient == "" || newValue <= 0 || !newDepositDate) {
      return swal({ title: "Campos inválidos", icon: "warning" });
    }

    const token = localStorage.getItem("tokenApi");
    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/api/chs/create`,
      data: {
        client: newClient,
        value: newValue,
        depositDate: newDepositDate.toISOString(),
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    await axios
      .request(options)
      .then((response) => {
        if (response.status == 200) {
          swal({ title: "Cheque Cadastrado com sucesso", icon: "success" });
          props.getChs(props.pageActive);
        } else {
          swal({ title: "Falha ao cadastrar cheque", icon: "error" });
        }
      })
      .catch((error) => {
        swal({ title: "Falha ao cadastrar cheque", icon: "error" });
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
          Lançamento de Cheque
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6 mt-2">
            <label>Cliente</label>
            <input
              className="form-control"
              value={newClient}
              onChange={(e) => setNewClient(e.target.value)}
            />
          </div>
          <div className="col-md-6 mt-2">
            <label>Valor</label>
            <input
              className="form-control"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              type="number"
            />
          </div>
          <div className="row mt-2">
            <div className="col">
              <ReactDatePicker
                className="form-control"
                selected={newDepositDate}
                onChange={(date) => setNewDepositDate(date)}
                dateFormat={"dd/MM/yyyy"}
                placeholderText="Data"
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={() => {
            handleCreateCh();
          }}
        >
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCadastroCh;
