import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { changeCurrentCollection, changeCurrentCollectionId } from "../features/collectionSlice";
import { changeExpiredStatus } from "../features/expiredSessionSlice";
import { menuChange } from "../features/menuChangeSlice";
import { openCollectionForm } from "../features/openCollectionFormSlice";
import "./CollectionForm.scss";
import ErrorMessage from "./ErrorMessage";

const CollectionForm = () => {
  const token = localStorage.getItem("token");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // Get the type in the state to be used later for class animations
  const [type, setType] = useState("concept");

  // Create an empty error message to check if input is valid. If so, stays as 0, otherwise message indicate type of errors until correct.
  const [errorMessage, setErrorMessage] = useState("");

  const createCollection = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = (document.querySelector("input[name='name']") as HTMLFormElement).value;
  
    axios
      .post(
        `${process.env.REACT_APP_BACKEND}/api/collections`,
        { name, type },
        { headers: { Authorization: token! } }
      )
      .then((res) => {
        // Name valid, reset the errorMessage value and close the form
        setErrorMessage("");
        dispatch(openCollectionForm(false));
        // Open the new collection
        dispatch(changeCurrentCollectionId(res.data._id));
        dispatch(changeCurrentCollection(name));
        // Wait a bit and then assign the active status to the newly created element
        // This doesn't seem to be the most optimal solution but it works
        setTimeout(() => assignActiveHtml(), 300);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          navigate("/redirect")
          dispatch(changeExpiredStatus(true));
        }
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
    dispatch(menuChange(true));
  };

  // Get the last item in the menu left nav and assign it the active status to show that it's the currently open
  const assignActiveHtml = () => {
    const activeItem = document.querySelector(".active-menu-item");
    activeItem?.classList.remove("active-menu-item");
    const navCollection = document.querySelector(`.collec-${type}`);
    const lastLi = navCollection?.lastChild;
    const link = lastLi?.firstChild;
    const el = link?.firstChild;
    (el as HTMLElement).classList.add("active-menu-item");
  };

  const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
    if ((e.target as HTMLInputElement).value !== "" && (e.target as HTMLInputElement).value.length < 80) {
      setErrorMessage("");
    }
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  return (
    <div className="wrapper-main">
      <form className="form form-collection" onSubmit={(e) => createCollection(e)}>
        <h1 className="title-form spacing-m">Create new collection</h1>
        <label htmlFor="name" className="input-label">
          Collection name:
        </label>
        <input type="text" name="name" onChange={(e) => handleChange(e)} className="input-text" />
        <label htmlFor="collection-type-select" className="input-label">
          Type of collection:
        </label>
        <select name="collection-type-select" className="select-collection" onChange={(e) => handleSelect(e)}>
          <option value="concept">Concepts</option>
          <option value="language">Language</option>
          <option value="to-do">To do</option>
        </select>
        <button type="submit" className="btn-primary">
          Create collection
        </button>
        <button type="button" onClick={() => dispatch(openCollectionForm(false))} className="btn-secondary">
          Close
        </button>
        {errorMessage !== "" ? <ErrorMessage textError={errorMessage} /> : null}
      </form>
    </div>
  );
};

export default CollectionForm;
