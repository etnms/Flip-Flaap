import "./Flashcard.scss";
import "../App.scss";
import "../SassStyles/icons.scss";
import { IFlashcard } from "../Interfaces/InterfaceFlashcard";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import React, { useState } from "react";
import Loader from "./Loaders/Loader";

const Flashcard = (props: React.PropsWithChildren<IFlashcard>) => {
  const { _id, concept, collectionName, date, definition, setItemChange } = props;

  const token = localStorage.getItem("token");

  const [edit, setEdit] = useState(false);

  const [conceptText, setConceptText] = useState(concept);
  const [defText, setDefText] = useState(definition);

  const [loadingDelete, setLoadingDelete] = useState(false);

  const formatDate = (value: Date) => {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return `${year}/${month}/${day}`;
  };

  const deleteFlashcard = (_id: string, name: string, e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    setLoadingDelete(true);
    // Select the flashcard element for animation purposes
    const spanEl = (e.target as HTMLElement).parentElement; //span
    const flashcardEl = spanEl?.parentElement;
    axios
      .delete(`${process.env.REACT_APP_BACKEND}/api/flashcards`, {
        data: { _id, name },
        headers: { Authorization: token! },
      })
      .then(() => {
        // Animation only, the backedn takes care of the delete logic
        flashcardEl?.classList.add("deleted-item");
        // Time out before state refresh to see the updated collection
        // There's probably a better way to do that but it works
        setTimeout(() => setItemChange(true), 100);
        setLoadingDelete(false);
      })
      .catch(() => setLoadingDelete(false));
  };

  const handleChange = (e: React.ChangeEvent<HTMLElement>, elementName: string) => {
    if (elementName === "concept") setConceptText((e.target as HTMLInputElement).value);
    if (elementName === "definition") setDefText((e.target as HTMLInputElement).value);
  };

  const editFlashcard = () => {
    axios
      .put(
        `${process.env.REACT_APP_BACKEND}/api/flashcards`,
        {
          _id,
          concept: conceptText,
          definition: defText,
        },
        { headers: { Authorization: token! } }
      )
      .then((res) => {
        setEdit(false);
      })
      .catch((err) => console.log(err));
  };

  const renderFlashcard = () => {
    if (edit) {
      return (
        <div className="flashcard">
          <input
            name="concept"
            className="edit-text title-flashcard"
            type="text"
            value={`${conceptText}`}
            onChange={(e) => handleChange(e, "concept")}
          />
          <textarea
            name="definition"
            value={`${defText}`}
            className="edit-text edit-def"
            onChange={(e) => handleChange(e, "definition")}></textarea>
          <p className="created-on-text">Created on: {<em>{formatDate(date)}</em>}</p>
          <span className="wrapper-btn-flashcards">
            {loadingDelete ? ( // Loading animation if item is being deleted
              <Loader />
            ) : (
              <DeleteOutlinedIcon
                onClick={(e) => deleteFlashcard(_id, collectionName, e)}
                className="icon icon-delete"
                aria-label="button delete flashcard"
              />
            )}
            <CheckIcon
              onClick={() => editFlashcard()}
              className="icon icon-edit"
              aria-label="button validate edit"
            />
          </span>
        </div>
      );
    } else {
      return (
        <div className="flashcard">
          <h2 className="title-flashcard">
            Concept: <strong>{conceptText}</strong>
          </h2>
          <p className="def-text"> Definition: {defText}</p>
          <p className="created-on-text">Created on: {<em>{formatDate(date)}</em>}</p>
          <span className="wrapper-btn-flashcards">
            {loadingDelete ? ( // Loading animation if item is being deleted
              <Loader /> 
            ) : (
              <DeleteOutlinedIcon
                onClick={(e) => deleteFlashcard(_id, collectionName, e)}
                className="icon icon-delete"
                aria-label="button delete flashcard"
              />
            )}
            <EditIcon
              onClick={() => setEdit(true)}
              className="icon icon-edit"
              aria-label="button validate edit"
            />
          </span>
        </div>
      );
    }
  };

  return renderFlashcard();
};

export default Flashcard;
