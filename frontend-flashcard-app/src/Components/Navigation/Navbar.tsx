import { useNavigate } from "react-router-dom";
import "./Navbar.scss";
import "../../SassStyles/Buttons.scss";
import React from "react";

interface ILoginProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Function;
  setMode: Function;
  username: string;
  setFirstLoad: Function;
}

const Navbar = (props: React.PropsWithChildren<ILoginProps>) => {
  const { isLoggedIn, setIsLoggedIn, setFirstLoad, setMode, username } = props;
  const navigate = useNavigate();

  const signup = () => {
    navigate("/signup");
  };

  const login = () => {
    navigate("/login");
  };

  const signOut = () => {
    localStorage.setItem("token", "");
    setIsLoggedIn(false);
    setFirstLoad(true);
  };

  const selectMode = (mode: string, e: React.MouseEvent<HTMLButtonElement>) => {
    const activeTab = document.querySelector(".link-active");
    activeTab?.classList.remove("link-active");
    (e.target as HTMLButtonElement).classList.add("link-active");
    setMode(mode);
  };

  return (
    <div className="wrapper-navbar">
      <nav className="navbar">
        {isLoggedIn ? (
          <nav className="nav nav-menu">
            <button onClick={(e) => selectMode("Flashcard", e)} className="navbar-link link-active"> {/*Default value */}
              Create Flashcards
            </button>
            <button onClick={(e) => selectMode("Learn", e)} className="navbar-link">
              Learn
            </button>
            <button onClick={(e) => selectMode("Practice", e)} className="navbar-link">
              Practice
            </button>
          </nav>
        ) : (
          <div></div>
        )}
        {!isLoggedIn ? (
          <nav className="nav nav-auth">
            <button onClick={() => signup()} className="btn-white btn-border" aria-label="signup button">
              Sign up
            </button>
            <button onClick={() => login()} className="btn-primary" aria-label="login button">
              Login
            </button>
          </nav>
        ) : (
          <nav className="nav nav-auth">
            <p>Welcome, {username}</p>
            <button onClick={() => signOut()} className="btn-white btn-border" aria-label="sign out button">
              Sign out
            </button>
          </nav>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
