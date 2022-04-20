import "./LoadingScreen.scss";

const LoadingScreen = () => {
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
        <h1 className="title-s">Loading</h1>
        <p>We're preparing your dashboard.</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
