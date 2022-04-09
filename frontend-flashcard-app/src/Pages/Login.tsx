import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const navigateIndex = () => {
    navigate("/");
  };

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (document.querySelector("input[name='username']") as HTMLInputElement).value;
    const password = (document.querySelector("input[name='password']") as HTMLInputElement).value;
    axios
      .post(`${process.env.REACT_APP_BACKEND}/api/login`, { username, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigateIndex();
      })
      .catch((err) => console.log(err));
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
          <label htmlFor="password" className="input-label">Password</label>
          <input type="password" name="password"  className="input-text"  />
          </div>
          <span className="wrapper-button-auth">
            <button type="submit" className="btn-primary">
              Login
            </button>
            <button type="button" onClick={() => navigate("/signup")} className="btn-white btn-border">
              Signup
            </button>
          </span>
        
      </form>
    </div>
  );
};

export default Login;
