import "./Flashcard.scss";
import { IFlashcard } from "../Interfaces/InterfaceFlashcard";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { useState } from "react";

const Flashcard = (props: React.PropsWithChildren<IFlashcard>) => {
  const { _id, concept, collectionName, date, definition, setItemChange } = props;

  const token = localStorage.getItem("token");

  const [edit, setEdit] = useState(false);

  const [conceptText, setConceptText] = useState(concept);
  const [defText, setDefText] = useState(definition);

  const formatDate = (value: Date) => {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return `${year}/${month}/${day}`;
  };

  const deleteFlashcard = (_id: string, name: string) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND}/api/flashcards`, {
        data: { _id, name },
        headers: { Authorization: token! },
      })
      .then((res) => {
        setItemChange(true);
        console.log(res);
      })
      .catch((err) => console.log(err));
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
        console.log(res);
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
            <DeleteOutlinedIcon onClick={() => deleteFlashcard(_id, collectionName)} />
            <CheckIcon onClick={() => editFlashcard()} />
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
            <DeleteOutlinedIcon onClick={() => deleteFlashcard(_id, collectionName)} />
            <EditIcon onClick={() => setEdit(true)} />
          </span>
        </div>
      );
    }
  };

  return renderFlashcard();
};

export default Flashcard;
