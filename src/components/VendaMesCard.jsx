import React from "react";

import ModalVendasMes from "./ModalVendasMes";

import "./VendaMesCard.css";

const VendaMesCard = ({ mes }) => {
  console.log(mes);
  return (
    <div className="card-venda-mes p-2">
      <div className="row text-center">
        <div className="col">
          <h5>{mes?.monthName}</h5>
          {mes?.month}/{mes?.year}
        </div>
      </div>

      <hr />
      <div className="row text-center">
        <div className="col">R${mes?.totalSelled}</div>
      </div>
    </div>
  );
};

export default VendaMesCard;
