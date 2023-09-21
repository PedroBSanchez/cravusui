import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";

import swal from "sweetalert";
import Pagination from "react-bootstrap/Pagination";

import { FaTrashAlt } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";

import { numberToReal } from "../../utils/numberToReal";
import ModalLoading from "../ModalLoading";

import axios from "axios";
import ModalCadastroCh from "./ModalCadastroCh";

const Cheques = ({ isOpen }) => {
  const [loading, setLoading] = useState(false);
  const [showModalCadastro, setShowModalCadastro] = useState(false);

  const now = new Date();
  const startMonth = new Date();
  startMonth.setDate(1);
  startMonth.setHours(0, 0, 0, 0);
  const endMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const [startDate, setStartDate] = useState(startMonth);
  const [endDate, setEndDate] = useState(endMonth);
  const [totalValue, setTotalValue] = useState(0);

  const [chs, setChs] = useState([]);

  const [client, setClient] = useState("");

  const [pageActive, setPageActive] = useState(1);
  let page = 1;
  let amountPages = [];

  for (let number = 1; number <= chs.totalPages; number++) {
    if (number === pageActive) {
      page = pageActive;
    }
    amountPages.push(
      <Pagination.Item
        key={number}
        active={number === pageActive}
        onClick={() => {
          handlePageChange(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  const handlePageChange = (pageNumber) => {
    setPageActive(pageNumber);
    page = pageNumber;
    getChs(page);
  };

  const getChs = async (pageParam) => {
    const token = localStorage.getItem("tokenApi");
    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}/api/chs/paginate`,
      data: {
        page: pageParam,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        client: client,
        isOpen: isOpen,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    setLoading(true);
    await axios
      .request(options)
      .then(async (response) => {
        setLoading(false);
        setChs(response.data);
      })
      .catch((error) => {
        setLoading(false);
        swal({
          title: "Falha ao carregar cheques",
          icon: "error",
        });
      });
  };
  const handleRemoveCh = async (chId) => {
    const token = localStorage.getItem("tokenApi");
    const options = {
      method: "DELETE",
      url: `${process.env.REACT_APP_BASE_URL}/api/chs/delete/${chId}`,

      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    await axios
      .request(options)
      .then((response) => {
        if (response.status == 200) {
          swal({ title: "Cheque removido com sucesso", icon: "success" });
          getChs(pageActive);
        } else {
          swal({ title: "Cheque não encontrado", icon: "error" });
        }
      })
      .catch((error) => {
        swal({ title: "Falha ao deletar cheque", icon: "error" });
      });
  };

  useEffect(() => {
    getChs();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-2 col-sm-6">
          <input
            className="form-control m-2"
            placeholder="Cliente"
            value={client}
            onChange={(e) => setClient(e.target.value)}
          />
        </div>
        <div className="col-md-3 col-sm-6">
          <label>Início</label>
          <ReactDatePicker
            className="m-2 form-control"
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
            }}
            dateFormat={"dd/MM/yyyy"}
          />
        </div>
        <div className="col-md-3 col-sm-6">
          <label>Fim</label>
          <ReactDatePicker
            className="m-2 form-control"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat={"dd/MM/yyyy"}
            popperPlacement="right"
          />
        </div>

        <div className="col-md-1">
          <BiSearchAlt
            className="m-2"
            size={30}
            style={{ cursor: "pointer" }}
            onClick={() => {
              getChs(1);
            }}
          />
        </div>
        <div className="col-md-1">
          <button
            className="btn btn-success"
            onClick={() => {
              setShowModalCadastro(true);
            }}
          >
            Cadastrar
          </button>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col">
          <h5>Total: {numberToReal(totalValue)}</h5>
        </div>
      </div>
      <div className="row mt-4 text-center justify-content-center">
        <div className="col-md-8 col-sm-12">
          <div className="table-container">
            <table className="table table-responsive table-striped table-warning">
              <thead>
                <th>#</th>
                <th>Cliente</th>
                <th>Valor</th>
                <th>Data</th>
                <th></th>
              </thead>
              <tbody>
                {chs.chsPaginate &&
                  chs.chsPaginate.map((ch, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{ch.client}</td>
                        <td>{ch.value}</td>
                        <td>{new Date(ch.depositDate).toLocaleDateString()}</td>
                        <td>
                          <FaTrashAlt
                            color="#eb6767"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleRemoveCh(ch._id);
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row mt-2 text-center justify-content-center">
        <div className="col-1">
          <Pagination>{amountPages}</Pagination>
        </div>
      </div>

      <ModalCadastroCh
        show={showModalCadastro}
        onHide={() => {
          setShowModalCadastro(false);
        }}
        pageActive={pageActive}
        getChs={getChs}
      />
      <ModalLoading show={loading} onHide={() => setLoading(false)} />
    </>
  );
};

export default Cheques;
