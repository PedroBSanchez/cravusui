import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiSearchAlt } from "react-icons/bi";

import NavbarPadrao from "../components/NavbarPadrao";
import TablePadrao from "../components/TablePadrao";
import "./Produtos.css";
import ModalCadastro from "../components/ModalCadastro";
import { numberToReal } from "../utils/numberToReal";

const Produtos = () => {
  const [search, setSearch] = useState("");

  const [items, setItems] = useState([]);
  const [modalCadastroShow, setModalCadastroShow] = useState(false);

  const [totalEstoque, setTotalEstoque] = useState(0);

  useEffect(() => {
    getItems();
    getTotalEstoque();
  }, []);

  const getItems = async (description = "", pageParam = 1) => {
    const token = localStorage.getItem("tokenApi");

    await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/items/paginate/?page=${pageParam}&description=${description}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  const getTotalEstoque = async () => {
    const token = localStorage.getItem("tokenApi");

    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/items/totalvalue`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTotalEstoque(response.data.total);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <NavbarPadrao />
      <div className="container-fluid">
        <div className="row text-center mt-4">
          <div className="col-2">
            <h1 className="page-title">Produtos</h1>
          </div>
          <div className="col-1">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => setModalCadastroShow(true)}
            >
              Cadastrar
            </button>
          </div>
        </div>
        <hr />
        <div className="row align-items-baseline">
          <div className="offset-md-1 col-md-1">
            <label className="form-label">Descrição</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <div className="col-md-2 col-sm-1">
            <BiSearchAlt
              size={30}
              style={{ cursor: "pointer" }}
              onClick={() => {
                getItems(search);
              }}
            />
          </div>
          <div className="col-4">
            <p className="total-estoque">
              Total Estoque: <u>{numberToReal(totalEstoque)}</u>
            </p>
          </div>
        </div>
        <div className="row mt-2">
          <div className="offset-1 col-10">
            <TablePadrao
              items={items}
              setItems={setItems}
              getItems={getItems}
              search={search}
            />
          </div>
        </div>
      </div>
      <ModalCadastro
        show={modalCadastroShow}
        onHide={() => setModalCadastroShow(false)}
        getItems={getItems}
      />
    </>
  );
};

export default Produtos;
