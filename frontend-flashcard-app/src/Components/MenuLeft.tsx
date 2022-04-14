import "../SassStyles/icons.scss";
import "./MenuLeft.scss";
import "../SassStyles/TitlesAndTexts.scss";
import DeleteConfirm from "./DeleteConfirm";
import { IMenuProps } from "../Interfaces/InterfaceMenu";
import { useState } from "react";
import MenuLeftItem from "./MenuLeftItem";


const MenuLeft = (props: React.PropsWithChildren<IMenuProps>) => {
  const { collectionNames, setShowCollectionForm, setCurrentCollection, setLeftMenuChange } = props;

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [idCollection, setIdCollection] = useState("");
  const [nameCollection, setNameCollection] = useState(""); // Get the name of the collection for delete purposes

  // Main function to display individual items with collection names and buttons
  const displayNames = () => {
    return collectionNames.map((result) => (
      <li key={result._id}>
        <MenuLeftItem
          _id={result._id}
          name={result.name}
          setConfirmDeleteOpen={setConfirmDeleteOpen}
          setCurrentCollection={setCurrentCollection}
          setIdCollection={setIdCollection}
          setNameCollection={setNameCollection}
        />
      </li>
    ));
  };

  return (
    <div className="menu-left">
      <h1 className="title">Collections</h1>
      <ul className="nav-collections">{displayNames()}</ul>
      <button onClick={() => setShowCollectionForm(true)} className="btn-white">
        Create new collection
      </button>
      {confirmDeleteOpen ? (
        <DeleteConfirm // Component to give confirm message if collection needs to be deleted
          setShowCollectionForm={setShowCollectionForm}
          setCurrentCollection={setCurrentCollection}
          setLeftMenuChange={setLeftMenuChange}
          setConfirmDeleteOpen={setConfirmDeleteOpen}
          idCollection={idCollection}
          nameCollection={nameCollection}
        />
      ) : null}
    </div>
  );
};

export default MenuLeft;
