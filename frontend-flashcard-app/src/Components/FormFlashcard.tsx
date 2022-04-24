import axios from "axios";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { changeExpiredStatus } from "../features/expiredSessionSlice";
import { conceptTypeText, defTypeText, placeHolderConcept, placeHolderDef } from "../helper/helper";
import "../SassStyles/Forms.scss";
import CustomSelect from "./CustomSelect";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loaders/Loader";
import "./CustomSelect.scss";

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

  const [isLoading, setIsLoading] = useState(false);

  // For to dos only - color option
  
  const colorValues = [
    "none",
    "red",
    "yellow",
    "orange",
    "#2BFF52",
    "cyan",
    "#5073FF",
    "#F454FF",
    "purple",
    "black",
  ];
  const [color, setColor] = useState(colorValues[0]); // Default to white
  useEffect(() => {
    // Adapting error post text
    setErrorPost(false);
  }, [currentCollectionId]);

  const createFlashCard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const definition = (document.querySelector("textarea[name='definition']") as HTMLInputElement).value;
    const _id = currentCollectionId;

    if (type !== "to-do") {
      const concept = (document.querySelector("input[name='concept']") as HTMLInputElement).value;
      axios
        .post(
          `${process.env.REACT_APP_BACKEND}/api/flashcards`,
          { concept, definition, _id },
          { headers: { Authorization: token! } }
        )
        .then(() => {
          setItemChange(true);
          setErrorPost(false);
          setIsLoading(false);
          (document.querySelector("input[name='concept']") as HTMLInputElement).value = "";
          (document.querySelector("textarea[name='definition']") as HTMLInputElement).value = "";
        })
        .catch((err) => {
          errorDisplay(err);
          setIsLoading(false);
        });
    }
    if (type === "to-do")
      axios
        .post(
          `${process.env.REACT_APP_BACKEND}/api/todos`,
          { definition, _id, color },
          { headers: { Authorization: token! } }
        )
        .then(() => {
          setItemChange(true);
          setErrorPost(false);
          (document.querySelector("textarea[name='definition']") as HTMLInputElement).value = "";
          setIsLoading(false);
        })
        .catch((err) => {
          errorDisplay(err);
          setIsLoading(false);
        });
  };

  const errorDisplay = (err: any) => {
    if (err.response.data.message === "Error field empty") {
      setErrorPost(true);
    }
    if (err.response.status === 403) {
      dispatch(changeExpiredStatus(true));
      navigate("/redirect");
    }
  };

  return (
    <form onSubmit={(e) => createFlashCard(e)} className="form form-flashcard">
      {type !== "to-do" ? (
        <label htmlFor="concept" className="input-label">
          {conceptTypeText(type)}:
        </label>
      ) : null}
      {type !== "to-do" ? (
        <input
          type="text"
          name="concept"
          placeholder={placeHolderConcept(type)}
          className="input-text-flashcard"
        />
      ) : null}
      <label htmlFor="definition" className="input-label">
        {defTypeText(type)}:
      </label>
      <textarea
        name="definition"
        placeholder={placeHolderDef(type)}
        className="input-text-flashcard def"></textarea>
         {type === "to-do" ? (
        <h2 className="input-label">
          Color:
        </h2>
      ) : null}
      {type === "to-do" ? ( // To do only: get select color to associate with the to do
        <CustomSelect colorOnly={true} currentValue={color} setSelect={setColor} values={colorValues} displayUp={true} />
      ) : null}
      {errorPost ? <ErrorMessage textError={"Error: one of the fields is empty."} /> : null}
      {isLoading ? (
        <Loader />
      ) : (
        <button type="submit" className="btn-primary btn-form-flashcard">
          Create
        </button>
      )}
    </form>
  );
};

export default FormFlashcard;
