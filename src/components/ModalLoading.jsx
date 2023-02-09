import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

import "./ModalLoading.css";

const ModalLoading = (props) => {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop
      >
        <Modal.Body>
          <div className="row text-center">
            <p className="loading-text">Carregando...</p>
          </div>
          <div className="row mt-2 text-center justify-content-center">
            <Spinner animation="border" role="status" size="45">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalLoading;
