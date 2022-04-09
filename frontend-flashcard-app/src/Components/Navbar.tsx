import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import "../SassStyles/Buttons.scss";

interface ILoginProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Function;
  setMode: Function;
}

const Navbar = (props: React.PropsWithChildren<ILoginProps>) => {
  const { isLoggedIn, setIsLoggedIn, setMode } = props;
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
  };

  return (
    <div className="wrapper-navbar">
      <nav className="navbar">
        {isLoggedIn ? (
          <nav className="nav nav-menu">
            <button onClick={() => setMode("Flashcard")}  className="link">Create Flashcards</button>
            <button onClick={() => setMode("Learn")}  className="link">Learn</button>
            <button onClick={() => setMode("Practice")}  className="link">Practice</button>
          </nav>
        ) : (
          <div></div>
        )}
        {!isLoggedIn ? (
          <nav className="nav nav-auth">
            <button onClick={() => signup()} className="btn-white btn-border">
              Sign up
            </button>
            <button onClick={() => login()} className="btn-primary">
              Login
            </button>
          </nav>
        ) : (
          <nav className="nav nav-auth">
            <button onClick={() => signOut()} className="btn-tertiary">
              Sign out
            </button>
          </nav>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
