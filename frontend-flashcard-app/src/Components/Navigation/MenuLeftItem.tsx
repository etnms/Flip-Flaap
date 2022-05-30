import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  changeCurrentCollection,
  changeCurrentCollectionId,
  changeCurrentCollectionType,
} from "../../features/collectionSlice";
import {
  openDeleteConfirm,
  setIDcollectionDelete,
  setNameCollectionDelete,
} from "../../features/deleteConfirmSlice";
import { IMenuLeftItem } from "../../Interfaces/InterfaceMenu";
import { openCollectionForm } from "../../features/openCollectionFormSlice";
import { useNavigate } from "react-router-dom";
import { changeExpiredStatus } from "../../features/expiredSessionSlice";

const MenuLeftItem = (props: React.PropsWithChildren<IMenuLeftItem>) => {
  const { _id, name, type, setSelectedHTML } = props;

  const [edit, setEdit] = useState(false);
  const [currentName, setCurrentName] = useState(name); //extra name for the sole purpose of editing

  const token = localStorage.getItem("token");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const collectionFormOpen = useAppSelector((state) => state.openCollectionForm.open);

  const openConfirmDelete = (_id: string, name: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(setNameCollectionDelete(name));
    dispatch(setIDcollectionDelete(_id));
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
      .then()
      .catch((err) => {
        if (err.response.status === 403) {
          navigate("/redirect");
        }
        dispatch(changeExpiredStatus(true));
      });
    setEdit(false);
  };

  const selectCollection = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent> | React.KeyboardEvent<HTMLSpanElement>,
    name: string,
    _id: string,
    type: string
  ) => {
    dispatch(changeCurrentCollection(name));
    dispatch(changeCurrentCollectionId(_id));
    dispatch(changeCurrentCollectionType(type));
    // UI: Remove the previous active collection and assign selected one
    const activeItem = document.querySelector(".active-menu-item");
    activeItem?.classList.remove("active-menu-item");
    (e.target as HTMLButtonElement).classList.add("active-menu-item");
    // If collection form is open then close
    if (collectionFormOpen) {
      dispatch(openCollectionForm(false));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key ==="Enter") selectCollection(e, currentName, _id, type)
  }

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
        <span onClick={(e) => selectCollection(e, currentName, _id, type)} onKeyDown={(e) => handleKeyPress(e)} className="collection-name" tabIndex={0}>
          {currentName}
        </span>
      )}
      <span className="wrapper-edit">
        {edit ? (
          <button
            className="icon icon-edit"
            onClick={() => editCollectionName(_id, currentName)}
            aria-label="button validate edit">
            <CheckIcon />
          </button>
        ) : (
          <button
            className="icon icon-edit"
            onClick={() => setEdit(true)}
            aria-label="button edit collection">
            <EditIcon />
          </button>
        )}
        <button  onClick={(e) => openConfirmDelete(_id, currentName, e)}
          className="icon icon-delete"
          aria-label="button delete collection">
        <DeleteOutlinedIcon
         
        /></button>
      </span>
    </span>
  );
};

export default MenuLeftItem;
