import axios from "axios";
import React, { PropsWithChildren } from "react";
import "../SassStyles/Forms.scss";

interface INameCollection {
  currentCollection: string;
  setItemChange: Function;
}

const FormFlashcard = (props: PropsWithChildren<INameCollection>) => {
  const { currentCollection, setItemChange } = props;

  const createFlashCard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const concept = (document.querySelector("input[name='concept']") as HTMLInputElement).value;
    const definition = (document.querySelector("textarea[name='definition']") as HTMLInputElement).value;
    const name = currentCollection;

    axios
      .post(`${process.env.REACT_APP_BACKEND}/api/flashcards`, { concept, definition, name })
      .then((res) => {setItemChange(true)})
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={(e) => createFlashCard(e)} className="form form-flashcard">
      <label htmlFor="concept" className="input-label">Concept: </label>
      <input type="text" name="concept" placeholder="Name of the concept" className="input-text-flashcard" />
      <label htmlFor="definition" className="input-label">Definition: </label>
      <textarea name="definition" placeholder="Definition to remember" className="input-text-flashcard def"></textarea>
      <button type="submit" className="btn-primary btn-form-flashcard">Create</button>
    </form>
  );
};

export default FormFlashcard;
