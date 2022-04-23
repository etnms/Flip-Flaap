import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../Components/ErrorMessage";
import HomeIcon from '@mui/icons-material/Home';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (document.querySelector("input[name='username']") as HTMLInputElement).value;
    const password = (document.querySelector("input[name='password']") as HTMLInputElement).value;
    axios
      .post(`${process.env.REACT_APP_BACKEND}/api/login`, { username, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        if (err.response.data === "Empty fields") return setErrorMessage("Error: one of the field is empty.");
        if (err.response.data === "Incorrect username or password")
          return setErrorMessage("Error: incorrect username or password.");
        return setErrorMessage("Error: there was a problem.");
      });
  };
  return (
    <div className="bg">
      <form onSubmit={(e) => login(e)} className="form form-auth">
        <h1 className="title">Login</h1>
        <div className="wrapper-input-auth">
          <label htmlFor="username" className="input-label">
            Username
          </label>
          <input type="text" name="username" className="input-text" />
          <div className="wrapper-password-text">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <span className="tooltip">
              ?{" "}
              <span className="tooltiptext">
                {" "}
                Passwords contain 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.
              </span>
            </span>
          </div>
          <input type="password" name="password" className="input-text" />
        </div>
        {errorMessage !== "" ? <ErrorMessage textError={errorMessage} /> : null}
        <span className="wrapper-button-auth">
          <button type="submit" className="btn-primary">
            Login
          </button>
          <button className="btn-white btn-border" onClick={() => navigate("/")}>{<HomeIcon/>}</button>
        </span>
      </form>
    </div>
  );
};

export default Login;
