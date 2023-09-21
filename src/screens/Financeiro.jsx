import React, { useState } from "react";
import NavbarPadrao from "../components/NavbarPadrao";

import "./Financeiro.css";
import Cheques from "../components/financeiro/Cheques";

const Financeiro = () => {
  const [currentSection, setCurrentSection] = useState("chequesEmAberto");

  const [listSection, setListSection] = useState([
    { name: "CHs em Aberto", section: "chequesEmAberto" },
    { name: "CHs Fechados", section: "chequesFechados" },
  ]);

  return (
    <>
      <NavbarPadrao />
      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col">
            <h1 className="page-title">Financeiro</h1>
          </div>
        </div>
        <div className="mt-2" style={{ flexDirection: "row" }}>
          {listSection.map((section, index) => {
            return (
              <a
                className={`section-list-element m-1 ${
                  currentSection == section.section
                    ? "section-list-element-active"
                    : ""
                }`}
                onClick={() => {
                  setCurrentSection(section.section);
                }}
              >
                {section.name}
              </a>
            );
          })}
        </div>
        <hr />
        {currentSection == "chequesEmAberto" && <Cheques isOpen={true} />}
        {currentSection == "chequesFechados" && <Cheques isOpen={false} />}
      </div>
    </>
  );
};

export default Financeiro;
