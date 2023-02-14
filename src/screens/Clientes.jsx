import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import ModalLoading from "../components/ModalLoading";
import NavbarPadrao from "../components/NavbarPadrao";
import axios from "axios";
import swal from "sweetalert";
import { FaTrashAlt } from "react-icons/fa";

import "./Clients.css";

const ModalCadastroCliente = (props) => {
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [phoneValid, setPhoneValid] = useState(false);
  let phoneMask;
  const handlePhone = (value) => {
    if (value != undefined) {
      let input = value;
      input = phoneMaskChange(input);
      phoneMask = input;
      document.getElementById("phoneInput").value = phoneMask;
    }
  };

  const phoneMaskChange = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
  };

  const validatePhone = () => {
    if (
      phoneMask.includes("(") &&
      phoneMask.includes(")") &&
      phoneMask.includes("-") &&
      phoneMask.length > 14
    ) {
      setPhoneValid(true);
      return true;
    }
    setPhoneValid(false);
    return false;
  };

  const setPhoneWithoutMask = () => {
    let phoneWithoutMask = newPhone;

    phoneWithoutMask = phoneWithoutMask.split(" ");
    phoneWithoutMask[0] = phoneWithoutMask[0].replace("(", "");
    phoneWithoutMask[0] = phoneWithoutMask[0].replace(")", "");
    phoneWithoutMask[1] = phoneWithoutMask[1].replace("-", "");

    //how join two strings in javascript?
    return `${phoneWithoutMask[0]}${phoneWithoutMask[1]}`;
  };

  const handleNewClient = async () => {
    const token = localStorage.getItem("tokenApi");

    const options = {
      url: `${process.env.REACT_APP_BASE_URL}/api/clients/create`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: newName,
        phone: setPhoneWithoutMask(),
      },
    };

    setLoading(true);
    await axios
      .request(options)
      .then((response) => {
        props.getClients();
        setLoading(false);
        setNewPhone("");
        setNewName("");
        document.getElementById("phoneInput").value = null;
        return swal({
          icon: "success",
          title: "Cliente Cadastrado com sucesso",
          timer: 2500,
        });
      })
      .catch((error) => {
        setLoading(false);
        setLoading(false);
        setNewPhone("");
        setNewName("");
        document.getElementById("phoneInput").value = null;
        return swal({
          icon: "error",
          title: "Falha ao cadastrar cliente",
          timer: 2500,
        });
      });
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Cadastro de Cliente
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                onChange={(e) => {
                  setNewName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                id="phoneInput"
                type="tel"
                isValid={phoneValid}
                placeholder="(DDD)"
                maxLength={15}
                onChange={(e) => {
                  setNewPhone(e.target.value);
                  handlePhone(e.target.value);
                  validatePhone();
                }}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => {
              handleNewClient();
            }}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
      <ModalLoading show={loading} onHide={() => setLoading(false)} />
    </>
  );
};

const Clientes = () => {
  const [modalCadastroClient, setModalCadastroCliente] = useState(false);

  const [clients, setClients] = useState([]);

  const [loadingClients, setLoadingClient] = useState(false);

  const getClients = async () => {
    const token = localStorage.getItem("tokenApi");

    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/clients/getall`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteClient = async (id) => {
    const token = localStorage.getItem("tokenApi");

    setLoadingClient(true);
    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/api/clients/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        getClients();
        setLoadingClient(false);
        return swal({
          icon: "success",
          title: "Cliente deletado com sucesso",
          timer: 2500,
        });
      })
      .catch((error) => {
        console.log(error);
        setLoadingClient(false);
        return swal({
          icon: "error",
          title: "Falha ao deletar cliente",
          timer: 2500,
        });
      });
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <>
      <NavbarPadrao />
      <div className="container-fluid">
        <div className="row text-center mt-4">
          <div className="col-2">
            <h1 className="page-title">Clientes</h1>
          </div>
          <div className="col-1">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                setModalCadastroCliente(true);
              }}
            >
              Cadastrar
            </button>
          </div>
        </div>
        <hr />
        <div className="row text-center justify-content-center">
          <div className="col-6">
            {" "}
            <table
              className="table table-warning table-striped"
              style={{ borderRadius: 15 }}
            >
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Número</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((element, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <th>{element?.name}</th>
                      <th>
                        <u>{element?.phone}</u>
                      </th>
                      <th>
                        <FaTrashAlt
                          color="#eb6767"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            handleDeleteClient(element?._id);
                          }}
                        />
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ModalCadastroCliente
        show={modalCadastroClient}
        onHide={() => setModalCadastroCliente(false)}
        getClients={getClients}
      />
      <ModalLoading
        show={loadingClients}
        onHide={() => setLoadingClient(false)}
      />
    </>
  );
};

export default Clientes;
