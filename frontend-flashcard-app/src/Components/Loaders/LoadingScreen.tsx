import React from "react";
import "./LoadingScreen.scss";

interface ILoading {
  title: string,
  message: string,
}

const LoadingScreen = (props: React.PropsWithChildren<ILoading>) => {

  const {title, message} = props;

  return (
    <div className="wrapper-loading">
      <div className="loader-square">
        <div className="square-row">
          <div className="square square-1"></div>
          <div className="square square-2"></div>
        </div>

        <div className="square-row">
          <div className="square square-3"></div>
          <div className="square square-4"></div>
        </div>
      </div>
      <div className="loading-text">
        <h1 className="title-s">{title}</h1>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
