import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormControl, FormLabel, FormSelect, Modal } from "react-bootstrap";
import { BiFontFamily } from "react-icons/bi";
import NavbarPadrao from "../components/NavbarPadrao";
import VendaMesCard from "../components/VendaMesCard";
import { verifyToken } from "../utils/verifyToken";
import ModalLoading from "../components/ModalLoading";
import { useNavigate } from "react-router-dom";

const Vendas = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [years, setYears] = useState([]);

  const [mesesVenda, setMesesVenda] = useState([]);

  const [totalSelledYear, setTotalSelledYear] = useState(0);

  useEffect(() => {
    validateToken();

    let yearNow = new Date().getFullYear();

    let newYears = [];

    for (let index = yearNow - 10; index < yearNow; index++) {
      newYears.push(index);
    }
    setYears(newYears);

    getSelledMonths(yearNow);
  }, []);

  const validateToken = async () => {
    await verifyToken().then((validToken) => {
      if (!validToken) {
        navigate("/");
      }
    });
  };

  const getSelledMonths = async (year) => {
    const token = localStorage.getItem("tokenApi");

    setLoading(true);
    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/orders/selledByMonth/${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setMesesVenda(response.data.monthsToCheck);
        setTotalSelledYear(response.data.totalSelledYear);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <NavbarPadrao />
      <div className="container-fluid">
        <div className="row mt-4 text-even">
          <div className="offset-1 col-2">
            <FormLabel>Ano</FormLabel>
            <FormSelect
              onChange={(e) => {
                setSelectedYear(e.currentTarget.value);
                getSelledMonths(e.currentTarget.value);
              }}
            >
              {years.map((element, index) => {
                return (
                  <option className="form-control" key={index} value={element}>
                    {element}
                  </option>
                );
              })}
              <option selected value={new Date().getFullYear()}>
                {new Date().getFullYear()}
              </option>
            </FormSelect>
          </div>
        </div>
        <hr />
        <div className="container">
          <div className="row text-center mt-3">
            {mesesVenda.map((mes, index) => {
              return (
                <div key={index} className="col-md-3 col-sm-6 mt-2 p-3">
                  <VendaMesCard mes={mes} year={selectedYear} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ModalLoading
        onHide={() => {
          setLoading(false);
        }}
        show={loading}
      />
    </>
  );
};

export default Vendas;
