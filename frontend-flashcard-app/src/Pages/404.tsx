import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import "./404.scss";

const Error404 = () => {
  const navigate: NavigateFunction = useNavigate();
  useEffect(() => {
    document.title = "404 - Page not found";
    const theme = localStorage.getItem("darkmode");
    if (theme === "darkmode") document.documentElement.setAttribute("data-color-scheme", "dark");
    else document.documentElement.setAttribute("data-color-scheme", "light");
  });

  return (

      <div className="page-404">
        <h1 className="title">Error 404</h1>
        <p>This page doesn't exist.</p>
        <button className="btn-primary" onClick={() => navigate("/")}>
          Go back to main screen
        </button>
      </div>

  );
};

export default Error404;
