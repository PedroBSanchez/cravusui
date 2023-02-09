import React from "react";

import "./ModalOrderInfo.css";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { numberToReal } from "../utils/numberToReal";

const ModalOrderInfo = (props) => {
  console.log(props.order);
  return (
    <Modal
      {...props}
      centered
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Informações Pedido
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row text-center justify-text-left">
          <div className="col">
            <h6>
              {props.order?.city} -{" "}
              {new Date(props.order?.createdAt).toLocaleDateString()}
            </h6>
            <h6>Vendedor: {props.order?.seller?.name}</h6>
          </div>
          <div className="col">
            <h6>Cliente: {props.order?.client}</h6>
            <h6>Código: {props.order?.code}</h6>
          </div>
        </div>
        <hr />
        <h4>Itens Pedido</h4>
        <div className="row p-2 text-center">
          <div className="col">
            <table
              className="table table-dark table-striped"
              style={{ borderRadius: "15px" }}
            >
              <thead>
                <th scope="col" style={{ color: "black" }}>
                  #
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Produto
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Código
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Preço Unitário
                </th>
                <th scope="col" style={{ color: "black" }}>
                  Quantidade
                </th>
              </thead>
              <tbody>
                {props.order?.items != undefined &&
                  props.order?.items.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.description}</td>
                        <td>
                          <u>{item?.code}</u>
                        </td>
                        <td>{numberToReal(item?.value)}</td>
                        <td>{item?.amount}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <h5>
            <u>Total:</u> R${props.order?.total?.toFixed(2)}
          </h5>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            props.onHide();
          }}
        >
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalOrderInfo;
