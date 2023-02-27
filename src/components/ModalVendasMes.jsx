import React from "react";

import { Modal, Button } from "react-bootstrap";

const ModalVendasMes = (props) => {
  return (
    <Modal
      {...props}
      centered
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>Vendas Mês</Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
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
