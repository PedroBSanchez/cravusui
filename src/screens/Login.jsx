import React from "react";
import { useNavigate } from "react-router-dom";

import LoginCard from "../components/LoginCard";

import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const navigateHome = (userInfo) => {
    localStorage.clear();
    localStorage.setItem("tokenApi", userInfo.token);
    navigate("/produtos");
  };
  return (
    <div className="login-background">
      <div className="container-fluid">
        <div className="row text-center mt-5">
          <h1 style={{ color: "white", position: "absolute" }}>Cravus</h1>
        </div>
        <div className="posicao-xesque">
          <div className="offset-lg-6 col-lg-4 offset-md-5 col-md-6">
            <LoginCard navigateHome={navigateHome} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
