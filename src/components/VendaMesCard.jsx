import axios from "axios";
import React, { useState } from "react";
import { numberToReal } from "../utils/numberToReal";

import ModalVendasMes from "./ModalVendasMes";
import ModalLoading from "./ModalLoading";

import "./VendaMesCard.css";

const VendaMesCard = ({ mes, year }) => {
  const [showModalVendaMes, setShowModalVendaMes] = useState(false);
  const [loading, setLoading] = useState(false);

  const [weeks, setWeeks] = useState([]);

  const handleOpenModalMes = () => {
    getSelledByWeeksMonth();
    setShowModalVendaMes(true);
  };

  const getSelledByWeeksMonth = async () => {
    const token = localStorage.getItem("tokenApi");

    setLoading(true);
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/orders/selledInMonth/${year}/${mes?.month}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setWeeks(response.data.weeks);
        console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="card-venda-mes p-2" onClick={handleOpenModalMes}>
        <div className="row text-center">
          <div className="col">
            <h5>{mes?.monthName}</h5>
            {mes?.month}/{year}
          </div>
        </div>

        <hr />
        <div className="row text-center">
          <div className="col">{numberToReal(mes?.totalSelled)}</div>
        </div>
      </div>
      <ModalVendasMes
        show={showModalVendaMes}
        onHide={() => setShowModalVendaMes(false)}
        weeks={weeks}
        monthName={mes?.monthName}
      />
      <ModalLoading show={loading} onHide={() => setLoading(false)} />
    </>
  );
};

export default VendaMesCard;
