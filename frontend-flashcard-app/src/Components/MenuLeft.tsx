import axios from "axios";
import "./MenuLeft.scss";
import "../SassStyles/TitlesAndTexts.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

interface IMenuProps {
  setShowCollectionForm: Function;
  collectionNames: Array<Collection>;
  setCurrentCollection: Function;
  setLeftMenuChange: Function;
}

type Collection = {
  name: string;
  _id: string;
};

const MenuLeft = (props: React.PropsWithChildren<IMenuProps>) => {
  const { collectionNames, setShowCollectionForm, setCurrentCollection, setLeftMenuChange } = props;

  const token = localStorage.getItem("token");

  const deleteCollection = (value: string) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND}/api/collections`, {
        data: { _id: value },
        headers: { Authorization: token! },
      })
      .then((res) => {
        setLeftMenuChange(true);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const displayNames = () => {
    return collectionNames.map((result) => (
      <li key={result._id}>
        <span className="collection-link">
          <span onClick={() => setCurrentCollection(result.name)} className="collection-name">{result.name}</span>
          <DeleteOutlinedIcon onClick={() => deleteCollection(result._id)} />
        </span>
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
    </div>
  );
};

export default MenuLeft;
