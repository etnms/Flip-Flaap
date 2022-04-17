import { useNavigate } from "react-router-dom";
import "./GettingStarted.scss";

const GettingStarted = () => {
  const navigate = useNavigate();

  const login = () => {
    navigate("/login");
  };

  const signup = () => {
    navigate("/signup");
  };

  return (
    <main className="get-started">
      <h1 className="title title-get-started">Flashcard Maker</h1>
      <div className="wrapper-sections">
        <section className="section-get-started">
          <p>
            Welcome to Flip-Flaap, a web app designed to help you learn and study with the use of
            flashcards.
          </p>
          <p>You can create flashcards and practice learning the concepts you wrote on them.</p>
          <p>
            Learning a new language? Preparing for an exam? Start creating flashcards to help you practice,
            learn, or remember anything you want.
          </p>
        </section>
        <section className="section-get-started section-login">
          <p>
            <button className="btn-white btn-border" onClick={() => signup()} aria-label="signup button" >
              Sign up
            </button>
            {" "}or{" "}
            <button className="btn-primary" onClick={() => login()} aria-label="login button">
              login
            </button>
            {" "}to get started.
          </p>
          <p>
            Flashcard Maker is completely <strong className="get-started-b">free!</strong>
          </p>
        </section>
      </div>
    </main>
  );
};

export default GettingStarted;
