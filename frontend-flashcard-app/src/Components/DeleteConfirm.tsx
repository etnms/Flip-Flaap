import axios from "axios";
import "./DeleteConfirm.scss";
import { IDeleteConfirm } from "../Interfaces/InterfaceDeleteConfirm";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { changeCurrentCollection } from "../features/collectionSlice";
import { openDeleteConfirm, showLoadingDelete } from "../features/deleteConfirmSlice";
import { menuChange } from "../features/menuChangeSlice";
import { useState } from "react";
import { LoaderDeleteCollection } from "./Loaders/Loader";

const DeleteConfirm = (props: React.PropsWithChildren<IDeleteConfirm>) => {
  const { selectedHTML } = props;

  const token = localStorage.getItem("token");

  const dispatch = useAppDispatch();

  // Get the name of the collection for delete purposes
  const nameCollectionDelete = useAppSelector((state) => state.confirmDeleteMenu.nameCollectionDelete);
  const idCollectionDelete = useAppSelector((state) => state.confirmDeleteMenu.idCollectionDelete);
  const currentCollection = useAppSelector((state) => state.currentCollection.value);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const deleteCollection = (_id: string) => {
    // Create loading animation before being deleted
    dispatch(showLoadingDelete(true));

    setDeleteLoading(true);
    axios
      .delete(`${process.env.REACT_APP_BACKEND}/api/collections`, {
        data: { _id },
        headers: { Authorization: token! },
      })
      .then(() => {
        selectedHTML.classList.add("deleted-item"); // Add delete animation to item
        dispatch(menuChange(true));
        dispatch(openDeleteConfirm(false));
        dispatch(showLoadingDelete(false));
        setDeleteLoading(false);
        // If the deleted collection is the one being open then remove its previous content
        // by change the currentcollection name to null
        if (currentCollection === nameCollectionDelete) dispatch(changeCurrentCollection(""));
      })
      .catch(() => {
        dispatch(showLoadingDelete(false));
        setDeleteLoading(false);
      });
  };

  return (
    <div className="confirm-menu">
      <h1>Are you sure you want to delete the following collection: </h1>
      <p className="name-selected-collection">{nameCollectionDelete}</p>
      <h1>?</h1>
      {deleteLoading ? (
        <LoaderDeleteCollection />
      ) : (
        <span className="delete-btn-wrapper">
          <button onClick={() => dispatch(openDeleteConfirm(false))} className="btn-white btn-border">
            No
          </button>
          <button onClick={() => deleteCollection(idCollectionDelete)} className="btn-alert">
            Yes
          </button>
        </span>
      )}
    </div>
  );
};

export default DeleteConfirm;
