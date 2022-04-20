import axios from "axios";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { changeExpiredStatus } from "../features/expiredSessionSlice";
import { conceptTypeText, defTypeText } from "../helper/helper";
import "../SassStyles/Forms.scss";
import ErrorMessage from "./ErrorMessage";

interface INameCollection {
  setItemChange: Function;
}

const FormFlashcard = (props: PropsWithChildren<INameCollection>) => {
  const { setItemChange } = props;

  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorPost, setErrorPost] = useState(false);

  const currentCollectionId = useAppSelector((state) => state.currentCollection._id);
  const type = useAppSelector((state) => state.currentCollection.type);

  useEffect(() => {
    setErrorPost(false);
  }, [currentCollectionId]);

  const createFlashCard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const concept = (document.querySelector("input[name='concept']") as HTMLInputElement).value;
    const definition = (document.querySelector("textarea[name='definition']") as HTMLInputElement).value;
    const _id = currentCollectionId;
    axios
      .post(
        `${process.env.REACT_APP_BACKEND}/api/flashcards`,
        { concept, definition, _id },
        { headers: { Authorization: token! } }
      )
      .then(() => {
        setItemChange(true);
        setErrorPost(false);
        (document.querySelector("input[name='concept']") as HTMLInputElement).value = "";
        (document.querySelector("textarea[name='definition']") as HTMLInputElement).value = "";
      })
      .catch((err) => {
        if (err.response.data.message === "Error field empty") {
          setErrorPost(true);
        }
        if (err.response.status === 403) {
          dispatch(changeExpiredStatus(true));
          navigate("/redirect")
        }
      });
  };

  return (
    <form onSubmit={(e) => createFlashCard(e)} className="form form-flashcard">
      <label htmlFor="concept" className="input-label">
        {conceptTypeText(type)}:
      </label>
      <input type="text" name="concept" placeholder="Name of the concept" className="input-text-flashcard" />
      <label htmlFor="definition" className="input-label">
        {defTypeText(type)}:
      </label>
      <textarea
        name="definition"
        placeholder="Definition to remember"
        className="input-text-flashcard def"></textarea>
      {errorPost ? <ErrorMessage textError={"Error: one of the fields is empty."} /> : null}
      <button type="submit" className="btn-primary btn-form-flashcard">
        Create
      </button>
    </form>
  );
};

export default FormFlashcard;
