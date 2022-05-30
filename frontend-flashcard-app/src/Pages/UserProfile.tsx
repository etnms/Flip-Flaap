import "./UserProfile.scss";
import "../SassStyles/Buttons.scss";
import "../SassStyles/Forms.scss";
import "../SassStyles/TitlesAndTexts.scss";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ErrorMessage from "../Components/ErrorMessage";

const UserProfile = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const [passwordChange, setPasswordChange] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");

  const changePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentPassword = (document.querySelector("input[name='current-password']") as HTMLInputElement)
      .value;
    const newPassword = (document.querySelector("input[name='new-password']") as HTMLInputElement).value;
    const confirmPassword = (document.querySelector("input[name='confirm-password']") as HTMLInputElement)
      .value;

    axios
      .put(
        `${process.env.REACT_APP_BACKEND}/api/dashboard/change-password`,
        { currentPassword, newPassword, confirmPassword },
        { headers: { Authorization: token! } }
      )
      .then((res) => {
        if (res.data === "Password updated") {
          (document.querySelector("input[name='current-password']") as HTMLInputElement).value = "";
          (document.querySelector("input[name='new-password']") as HTMLInputElement).value = "";
          (document.querySelector("input[name='confirm-password']") as HTMLInputElement).value = "";
          // Confirm messages
          setConfirmMessage("Your password was successfully updated!");
          setErrorMessage("");
          // Close password change form and timeout to make message disappear after 5s
          setPasswordChange(!passwordChange);
          setTimeout(() => setConfirmMessage(""), 5000);
        }
      })
      .catch((err) => {
        setConfirmMessage("");
        console.log(err.response);
        switch (err.response.data) {
          case "Passwords don't match":
            return setErrorMessage("Error: passwords don't match.");
          case "Wrong password":
            return setErrorMessage("Error: current password is incorrect.");
          case "Empty fields":
            return setErrorMessage("Error: some fields are empty.");
          case "There was a problem":
            return setErrorMessage("Error: there was a problem.");
          case "password":
            return setErrorMessage("Error: your password needs to be at least 6 characters long.");
          case "Passwords special characters":
            return setErrorMessage(
              "Error: your new password must contain 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character."
            );
          case "Passwords need to match":
            return setErrorMessage("Error: passwords need to match.");
        }
      });
  };

  useEffect(() => {
    document.title = "Flip-Flaap - Profile"
    if (localStorage.getItem("darkmode") === "darkmode") {
      document.documentElement.setAttribute("data-color-scheme", "dark");
      (document.querySelector("input[name='toggle-darkmode']") as HTMLInputElement).checked = true;
    } else {
      (document.querySelector("input[name='toggle-darkmode']") as HTMLInputElement).checked = false;
      document.documentElement.setAttribute("data-color-scheme", "light");
    }
  });

  const switchDarkmode = (e: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement> ) => {
    if ((e.target as HTMLInputElement).checked) {
      document.documentElement.setAttribute("data-color-scheme", "dark");
      localStorage.setItem("darkmode", "darkmode");
    } else {
      localStorage.setItem("darkmode", "lightmode");
      document.documentElement.setAttribute("data-color-scheme", "light");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const el = document.querySelector("input[name='toggle-darkmode']") as HTMLInputElement;
      el.checked = !el.checked;
      switchDarkmode(e);
    }
  }

  return (
    <div className="wrapper-profile">
      <main className="profile">
        <button className="btn-secondary" onClick={() => setPasswordChange(!passwordChange)}>
          Change password
        </button>
        {passwordChange ? (
          <form className="change-password-form" onSubmit={(e) => changePassword(e)}>
            <label htmlFor="current-password" className="input-label">
              Current password:
            </label>
            <input name="current-password" type="password" className="input-text" />
            <label htmlFor="new-password" className="input-label">
              New password:
            </label>
            <input name="new-password" type="password" className="input-text" />
            <label htmlFor="confirm-password" className="input-label">
              Confirm new password:
            </label>
            <input name="confirm-password" type="password" className="input-text" />
            <button type="submit" className="btn-primary">
              Apply changes
            </button>
          </form>
        ) : null}
        {errorMessage !== "" ? <ErrorMessage textError={errorMessage} /> : null}
        {confirmMessage !== "" ? <p className="success-msg">{confirmMessage}</p> : null}

        <span>Toggle dark mode</span>
        <label className="switch">
          <input type="checkbox" name="toggle-darkmode" onChange={(e) => switchDarkmode(e)} onKeyDown={(e) => handleKeyPress(e)} tabIndex={0}/>
          <span className="slider round"></span>
        </label>

        <button className="btn-primary" onClick={() => navigate("/")}>
          Back to flashcard dashboard
        </button>
      </main>
    </div>
  );
};

export default UserProfile;
