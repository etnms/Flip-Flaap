import React, { useState } from "react";

import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

interface IMenuLeftItem {
  _id: string;
  name: string;
  setCurrentCollection: Function;
  setConfirmDeleteOpen: Function;
  setNameCollection: Function;
  setIdCollection: Function;
}

const MenuLeftItem = (props: React.PropsWithChildren<IMenuLeftItem>) => {
  const { _id, name, setConfirmDeleteOpen, setCurrentCollection, setIdCollection, setNameCollection } = props;

  const [edit, setEdit] = useState(false);
  const [currentName, setCurrentName] = useState(name); //extra name for the sole purpose of editing

  const token = localStorage.getItem("token");

  const openConfirmDelete = (id: string, name: string) => {
    setNameCollection(name);
    setIdCollection(id);
    setConfirmDeleteOpen(true);
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

  const selectCollection = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, name: string) => {
    setCurrentCollection(currentName);
    const activeItem = document.querySelector(".active-menu-item");
    activeItem?.classList.remove("active-menu-item");
    (e.target as HTMLButtonElement).classList.add("active-menu-item");
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
        <span onClick={(e) => selectCollection(e, currentName)} className="collection-name">
          {currentName}
        </span>
      )}
      <span className="wrapper-edit">
        {edit ? (
          <CheckIcon className="icon icon-edit" onClick={() => editCollectionName(_id, currentName)} />
        ) : (
          <EditIcon className="icon icon-edit" onClick={() => setEdit(true)} />
        )}
        <DeleteOutlinedIcon
          onClick={() => openConfirmDelete(_id, currentName)}
          className="icon icon-delete"
        />
      </span>
    </span>
  );
};

export default MenuLeftItem;
