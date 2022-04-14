import axios from "axios";
import React, { useState } from "react";
import "./CollectionForm.scss";
import ErrorMessage from "./ErrorMessage";

interface IShowCollection {
  setShowCollectionForm: Function;
  setLeftMenuChange: Function;
}

const CollectionForm = (props: React.PropsWithChildren<IShowCollection>) => {
  const { setShowCollectionForm, setLeftMenuChange } = props;
  const token = localStorage.getItem("token");

  // Create an empty error message to check if input is valid. If so, stays as 0, otherwise message indicate type of errors until correct.
  const [errorMessage, setErrorMessage] = useState("");

  const createCollection = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = (document.querySelector("input[name='name']") as HTMLFormElement).value;
    axios
      .post(
        `${process.env.REACT_APP_BACKEND}/api/collections`,
        { name },
        { headers: { Authorization: token! } }
      )
      .then((res) => {
        // Name valid, reset the errorMessage value 
        setErrorMessage("");
        setShowCollectionForm(false);
      })
      .catch((err) => {
        if (err.response.data.error === "Name too long") {
          setErrorMessage(
            "Error: the name of the collection is too long. A collection name cannot be longer than 80 characters."
          );
        }
        if (err.response.data.error === "Error field empty") {
          setErrorMessage("Error: the field is empty.");
        }
        if (err.response.data.error === "Error creation collection") {
          setErrorMessage("There was a problem and the collection could not be created.");
        }
      });
    setLeftMenuChange(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
    if ((e.target as HTMLInputElement).value !== "" && (e.target as HTMLInputElement).value.length < 80) {
      setErrorMessage("");
    }
  };
  return (
    <div className="wrapper-main">
      <form className="form form-collection" onSubmit={(e) => createCollection(e)}>
        <h1>Create new collection</h1>
        <input type="text" name="name" onChange={(e) => handleChange(e)} className="input-text" />
        <button type="submit" className="btn-primary">
          Create collection
        </button>
        <button type="button" onClick={() => setShowCollectionForm(false)} className="btn-secondary">
          Close
        </button>
        {errorMessage !== "" ? <ErrorMessage textError={errorMessage} /> : null}
      </form>
    </div>
  );
};

export default CollectionForm;
