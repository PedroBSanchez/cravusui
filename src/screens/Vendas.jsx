import React, { useState, useEffect } from "react";
import { FormControl, FormLabel, FormSelect } from "react-bootstrap";
import { BiFontFamily } from "react-icons/bi";
import NavbarPadrao from "../components/NavbarPadrao";
import VendaMesCard from "../components/VendaMesCard";

const Vendas = () => {
  const [years, setYears] = useState([]);

  const [mesesVenda, setMesesVenda] = useState([
    { monthName: "Janeiro", totalSelled: 68000, month: "01", year: "2023" },
    { monthName: "Janeiro", totalSelled: 68000, month: "01", year: "2023" },
    { monthName: "Janeiro", totalSelled: 68000, month: "01", year: "2023" },
    { monthName: "Janeiro", totalSelled: 68000, month: "01", year: "2023" },
    { monthName: "Janeiro", totalSelled: 68000, month: "01", year: "2023" },
    { monthName: "Janeiro", totalSelled: 68000, month: "01", year: "2023" },
    { monthName: "Janeiro", totalSelled: 68000, month: "01", year: "2023" },
    { monthName: "Janeiro", totalSelled: 68000, month: "01", year: "2023" },
    { monthName: "Janeiro", totalSelled: 68000, month: "01", year: "2023" },
    { monthName: "Janeiro", totalSelled: 68000, month: "01", year: "2023" },
    { monthName: "Janeiro", totalSelled: 68000, month: "01", year: "2023" },
    { monthName: "Janeiro", totalSelled: 68000, month: "01", year: "2023" },
  ]);

  useEffect(() => {
    let yearNow = new Date().getFullYear();

    console.log(yearNow);

    let newYears = [];

    for (let index = yearNow - 10; index < yearNow; index++) {
      newYears.push(index);
    }
    setYears(newYears);
  }, []);

  return (
    <>
      <NavbarPadrao />
      <div className="container-fluid">
        <div className="row mt-4 text-even">
          <div className="offset-1 col-2">
            <FormLabel>Ano</FormLabel>
            <FormSelect>
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
                  <VendaMesCard mes={mes} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Vendas;
