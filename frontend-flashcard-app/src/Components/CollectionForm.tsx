import axios from "axios";
import React from "react";
import "./CollectionForm.scss";

interface IShowCollection {
  setShowCollectionForm: Function;
  setLeftMenuChange: Function;
}

const CollectionForm = (props: React.PropsWithChildren<IShowCollection>) => {
  const { setShowCollectionForm, setLeftMenuChange } = props;
  const token = localStorage.getItem("token");

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
        console.log(res);
      })
      .catch((err) => console.log(err));
      setLeftMenuChange(true);
  };

  return (
    <form className="form form-collection" onSubmit={(e) => createCollection(e)}>
      <h1>Create new collection</h1>
      <input type="text" name="name" />
      <button type="submit">Create collection</button>
      <button type="button" onClick={() => setShowCollectionForm(false)}>
        Hide collection
      </button>
    </form>
  );
};

export default CollectionForm;
