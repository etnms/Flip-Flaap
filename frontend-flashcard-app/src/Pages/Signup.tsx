import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const navigateIndex = () => {
    navigate("/");
  };
  const signup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (document.querySelector("input[name='email']") as HTMLInputElement).value;
    const username = (document.querySelector("input[name='username']") as HTMLInputElement).value;
    const password = (document.querySelector("input[name='password']") as HTMLInputElement).value;

    axios
      .post("http://localhost:8000/api/signup", { email, username, password })
      .then((res) => {
        if (res.data.message === "User created") {
          localStorage.setItem("token", res.data.token);
          navigateIndex();
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div className="bg">
      <form onSubmit={(e) => signup(e)} className="form form-auth">
        <h1 className="title">Signup</h1>
        <div className="wrapper-input-auth">
          <label htmlFor="email" className="input-label">
            Email
          </label>
          <input type="email" name="email" className="input-text" />
          <label htmlFor="username" className="input-label">
            Username
          </label>
          <input type="text" name="username" className="input-text" />
          <label htmlFor="password" className="input-label">
            Password
          </label>
          <input type="password" name="password" className="input-text" />
          <label htmlFor="confirm-password" className="input-label">
            Confirm Password
          </label>
          <input type="password" name="confirm-password" className="input-text" />
        </div>
        <button type="submit" className="btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
