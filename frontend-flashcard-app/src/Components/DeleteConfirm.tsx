import axios from "axios";
import "./DeleteConfirm.scss";
import { IDeleteConfirm } from "../Interfaces/InterfaceDeleteConfirm";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { changeCurrentCollection } from "../features/collectionSlice";
import { openDeleteConfirm, showLoadingDelete } from "../features/deleteConfirmSlice";
import { menuChange } from "../features/menuChangeSlice";

const DeleteConfirm = (props: React.PropsWithChildren<IDeleteConfirm>) => {
  const { selectedHTML } = props;

  const token = localStorage.getItem("token");

  const dispatch = useAppDispatch();

  const currentCollectionId = useAppSelector((state) => state.currentCollection._id)
  const nameCollectionDelete = useAppSelector((state) => state.confirmDeleteMenu.nameCollectionDelete);

  const deleteCollection = (value: string) => {
    // Create loading animation before being deleted
    dispatch(showLoadingDelete(true));
    axios
      .delete(`${process.env.REACT_APP_BACKEND}/api/collections`, {
        data: { _id: value },
        headers: { Authorization: token! },
      })
      .then(() => {
        selectedHTML.classList.add("deleted-item"); // Add delete animation to item
        dispatch(menuChange(true));
        dispatch(changeCurrentCollection(""));
        dispatch(openDeleteConfirm(false));
        dispatch(showLoadingDelete(false));
      })
      .catch(() =>  dispatch(showLoadingDelete(false)));
  };

  return (
    <div className="confirm-menu">
      <h1>Are you sure you want to delete the following collection: </h1>
      <p className="name-selected-collection">{nameCollectionDelete}</p>
      <h1>?</h1>
      <span className="delete-btn-wrapper">
        <button onClick={() => dispatch(openDeleteConfirm(false))} className="btn-white btn-border">
          No
        </button>
        <button onClick={() => deleteCollection(currentCollectionId)} className="btn-alert">
          Yes
        </button>
      </span>
    </div>
  );
};

export default DeleteConfirm;
