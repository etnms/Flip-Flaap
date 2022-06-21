import axios from "axios";
import React, { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import {
  changeCurrentCollection,
  changeCurrentCollectionId,
  changeCurrentCollectionType,
} from "../features/collectionSlice";
import { changeExpiredStatus } from "../features/expiredSessionSlice";
import { menuChange } from "../features/menuChangeSlice";
import { openCollectionForm } from "../features/openCollectionFormSlice";
import "./FormCollection.scss";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loaders/Loader";
import { Dispatch } from "redux";

const CollectionForm = () => {
  const token = localStorage.getItem("token");

  const dispatch: Dispatch<any> = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  // Get the type in the state to be used later for class animations
  const [type, setType] = useState<string>("concept");

  // Create an empty error message to check if input is valid. If so, stays as 0, otherwise message indicate type of errors until correct.
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Loading icon waiting for post request to be done
  const [loading, setLoading] = useState<boolean>(false);

  const createCollection = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    const name: string = (document.querySelector("input[name='name']") as HTMLFormElement).value;

    axios
      .post(
        `${process.env.REACT_APP_BACKEND}/api/collections`,
        { name, type },
        { headers: { Authorization: token! } }
      )
      .then((res) => {
        setLoading(false);
        // Name valid, reset the errorMessage value and close the form
        setErrorMessage("");
        dispatch(openCollectionForm(false));
        // Open the new collection
        dispatch(changeCurrentCollectionId(res.data._id));
        dispatch(changeCurrentCollection(name));
        dispatch(changeCurrentCollectionType(type));
        // Wait a bit and then assign the active status to the newly created element
        // This doesn't seem to be the most optimal solution but it works
        setTimeout(() => assignActiveHtml(), 300);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 403) {
          navigate("/redirect");
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
    const activeItem: Element | null = document.querySelector(".active-menu-item");
    activeItem?.classList.remove("active-menu-item");
    const navCollection: Element | null = document.querySelector(`.collec-${type}`);
    const lastLi: ChildNode | null | undefined = navCollection?.lastChild;
    const link: ChildNode | null | undefined = lastLi?.firstChild;
    const el: ChildNode | null | undefined = link?.firstChild;
    (el as HTMLElement).classList.add("active-menu-item");
  };

  const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
    if ((e.target as HTMLInputElement).value !== "" && (e.target as HTMLInputElement).value.length < 80) {
      setErrorMessage("");
    }
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
          <option className="select-item" value="concept">Concepts</option>
          <option className="select-item" value="language">Language</option>
          <option className="select-item" value="to-do">To do</option>
        </select>

        {loading ? (
          <Loader />
        ) : (
          <button type="submit" className="btn-primary">
            Create collection
          </button>
        )}
        <button type="button" onClick={() => dispatch(openCollectionForm(false))} className="btn-secondary">
          Close
        </button>
        {errorMessage !== "" ? <ErrorMessage textError={errorMessage} /> : null}
      </form>
    </div>
  );
};

export default CollectionForm;
