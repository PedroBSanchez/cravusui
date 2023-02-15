import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";

import ModalLoading from "./ModalLoading";

import "./LoginCard.css";

const LoginCard = ({ navigateHome }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const validateEmail = (emailText) => {
    if (emailText && emailText.match(isValidEmail)) {
      return true;
    }
    return false;
  };

  const handleLogin = () => {
    const isValidEmail = validateEmail(email);
    if (!email || email == "" || !password || password == "") {
      return swal({
        title: "Required fields",
        icon: "warning",
        dangerMode: true,
      });
    }
    if (!isValidEmail) {
      return swal({
        title: "Invalid email",

        icon: "warning",
        dangerMode: true,
      });
    }

    login();
  };

  const login = async () => {
    setLoading(true);
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/users/login`, {
        email: email,
        password: password,
      })
      .then(function (response) {
        setLoading(false);
        navigateHome(response.data);
      })
      .catch(function (error) {
        setLoading(false);
        swal({
          title: error.response.data ? error.response.data : "Error",
          icon: "warning",
          dangerMode: true,
        });
      });
  };

  return (
    <>
      <div className="login-card p-4">
        <p className="login-label-login">Email</p>
        <input
          type={"email"}
          className="login-input-login"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <p className="login-label-login mt-3">Senha</p>
        <input
          type={"password"}
          className="login-input-login"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="row mt-3">
          <div className="offset-md-9 col-md-3">
            <button className="btn btn-success" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
      <ModalLoading show={loading} onHide={() => setLoading(false)} />
    </>
  );
};

export default LoginCard;
