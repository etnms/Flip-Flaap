import "../../SassStyles/icons.scss";
import "./MenuLeft.scss";
import "../../SassStyles/TitlesAndTexts.scss";
import DeleteConfirm from ".././DeleteConfirm";
import { IMenuProps } from "../../Interfaces/InterfaceMenu";
import { useState } from "react";
import MenuLeftItem from "./MenuLeftItem";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { openCollectionForm } from "../../features/openCollectionFormSlice";

const MenuLeft = (props: React.PropsWithChildren<IMenuProps>) => {
  const { collectionNames } = props;

  const dispatch = useAppDispatch();

  const confirmDeleteOpen = useAppSelector((state) => state.confirmDeleteMenu.value);
  // Prop drilling for the selectedHTML as redux is not really a good option here (not a "normal" object)
  const [selectedHTML, setSelectedHTML] = useState<HTMLElement>();

  // Main function to display individual items with collection names and buttons
  const displayNames = () => {
    return collectionNames.map((result) => (
      <li key={result._id}>
        <MenuLeftItem _id={result._id} name={result.name} setSelectedHTML={setSelectedHTML} />
      </li>
    ));
  };

  return (
    <div className="menu-left">
      <h1 className="title">Collections</h1>
      <h2>First collection</h2>
      <ul className="nav-collections">{displayNames()}</ul>
      <h2>Second collection</h2>
      <button onClick={() => dispatch(openCollectionForm(true))} className="btn-white btn-new-collec">
        Create new collection
      </button>
      {confirmDeleteOpen ? (
        <DeleteConfirm // Component to give confirm message if collection needs to be deleted
          selectedHTML={selectedHTML!}
        />
      ) : null}
    </div>
  );
};

export default MenuLeft;
