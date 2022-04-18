import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeCurrentCollection, changeCurrentCollectionId } from "../../features/collectionSlice";
import { openDeleteConfirm, setIDcollectionDelete, setNameCollectionDelete } from "../../features/deleteConfirmSlice";
import { IMenuLeftItem } from "../../Interfaces/InterfaceMenu";
import { openCollectionForm } from "../../features/openCollectionFormSlice";


const MenuLeftItem = (props: React.PropsWithChildren<IMenuLeftItem>) => {
  const { _id, name, setSelectedHTML } = props;

  const [edit, setEdit] = useState(false);
  const [currentName, setCurrentName] = useState(name); //extra name for the sole purpose of editing

  const token = localStorage.getItem("token");

  const dispatch = useAppDispatch();
  const collectionFormOpen = useAppSelector((state) => state.openCollectionForm.open);

  const openConfirmDelete = (_id: string, name: string, e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    dispatch(setNameCollectionDelete(name))
    dispatch(setIDcollectionDelete(_id));
   // dispatch(changeCurrentCollectionId(_id));
    dispatch(openDeleteConfirm(true));

    // Get the html of the parent (name in menu + icon) for the delete animation
    const el = (e.target as HTMLElement).parentElement;
    const parent = el?.parentElement;
    setSelectedHTML(parent!);
  };

  const editCollectionName = (_id: string, name: string) => {
    axios
      .put(
        `${process.env.REACT_APP_BACKEND}/api/collections`,
        { _id, name },
        { headers: { Authorization: token! } }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setEdit(false);
  };

  const selectCollection = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, name: string, _id: string) => {
    dispatch(changeCurrentCollection(name));
    dispatch(changeCurrentCollectionId(_id));
    // UI: Remove the previous active collection and assign selected one 
    const activeItem = document.querySelector(".active-menu-item");
    activeItem?.classList.remove("active-menu-item");
    (e.target as HTMLButtonElement).classList.add("active-menu-item");
    // If collection form is open then close
    if (collectionFormOpen) {
      dispatch(openCollectionForm(false));
    }
  };

  return (
    
    <span className="collection-link">
      {edit ? (
        <input
          type="text"
          name="editname"
          className="input-collection-name"
          value={`${currentName}`}
          onChange={(e) => setCurrentName((e.target as HTMLInputElement).value)}
        />
      ) : (
        <span onClick={(e) => selectCollection(e, currentName, _id)} className="collection-name">
          {currentName}
        </span>
      )}
      <span className="wrapper-edit">
        {edit ? (
          <CheckIcon
            className="icon icon-edit"
            onClick={() => editCollectionName(_id, currentName)}
            aria-label="button validate edit"
          />
        ) : (
          <EditIcon
            className="icon icon-edit"
            onClick={() => setEdit(true)}
            aria-label="button edit collection"
          />
        )}
          <DeleteOutlinedIcon
            onClick={(e) => openConfirmDelete(_id, currentName, e)}
            className="icon icon-delete"
            aria-label="button delete collection"
          />
        
      </span>
    </span>
    
  );
};

export default MenuLeftItem;
