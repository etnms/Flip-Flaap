import axios from "axios";
import "./DeleteConfirm.scss";
import {} from "../Interfaces/InterfaceMenu";

interface IDeleteConfirm {
  setShowCollectionForm: Function;
  setCurrentCollection: Function;
  setLeftMenuChange: Function;
  setConfirmDeleteOpen: Function;
  idCollection: string;
  nameCollection: string;
}

const DeleteConfirm = (props: React.PropsWithChildren<IDeleteConfirm>) => {
  const { idCollection, nameCollection, setConfirmDeleteOpen, setCurrentCollection, setLeftMenuChange } =
    props;

  const token = localStorage.getItem("token");

  const deleteCollection = (value: string) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND}/api/collections`, {
        data: { _id: value },
        headers: { Authorization: token! },
      })
      .then((res) => {
        setLeftMenuChange(true);
        setCurrentCollection("");
        setConfirmDeleteOpen(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="confirm-menu">
      <h1>Are you sure you want to delete the following collection: </h1>
      <p className="name-selected-collection">{nameCollection}</p>
      <h1>?</h1>
      <span className="delete-btn-wrapper">
        <button onClick={() => setConfirmDeleteOpen(false)} className="btn-white btn-border">No</button>
        <button onClick={() => deleteCollection(idCollection)} className="btn-alert">
          Yes
        </button>
      </span>
    </div>
  );
};

export default DeleteConfirm;
