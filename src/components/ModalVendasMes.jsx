import React from "react";

import { Modal, Button } from "react-bootstrap";
import { numberToReal } from "../utils/numberToReal";

const ModalVendasMes = (props) => {
  return (
    <Modal
      {...props}
      centered
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>Vendas {props.monthName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.weeks.map((week, index) => {
          return (
            <>
              <div className="row" key={index}>
                <h3>{week?.week}</h3>
                <p>
                  {new Date(week?.start).toLocaleDateString()} -{" "}
                  {new Date(week?.end).toLocaleDateString()}
                </p>
                <h5>{numberToReal(week?.totalSelled)}</h5>
              </div>
              <hr />
            </>
          );
        })}
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

export default ModalVendasMes;
