import axios from "axios";
import { useEffect, useState } from "react";
import "./App.scss";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import CollectionForm from "./Components/FormCollection";
import FlashcardList from "./Components/FlashcardList";
import GettingStarted from "./Components/GettingStarted";
import Learn from "./Components/Learn";
import LoadingScreen from "./Components/Loaders/LoadingScreen";
import MenuLeft from "./Components/Navigation/MenuLeft";
import Navbar from "./Components/Navigation/Navbar";
import Practice from "./Components/Practice";
import { menuChange } from "./features/menuChangeSlice";

const App = () => {
  const token = localStorage.getItem("token");

  const dispatch = useAppDispatch();

  // Value for animation purposes => when create/delete users can see the collection list being changed
  const menuChangeValue = useAppSelector((state) => state.menuChangeValue.value);
  // Check if the menu for a new collection is open
  const openCollectionForm = useAppSelector((state) => state.openCollectionForm.open);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [loading, setLoading] = useState(true);

  const [results, setResults] = useState([]);

  const [mode, setMode] = useState("Flashcard"); // Default to create flashcard option
  const [username, setUsername] = useState("");

  useEffect(() => {

    const theme = localStorage.getItem("darkmode");
    if (theme === "darkmode") document.documentElement.setAttribute("data-color-scheme", "dark");
    else document.documentElement.setAttribute("data-color-scheme", "light");

    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/dashboard`, { headers: { Authorization: token! } })
      .then((res) => {
        setUsername(res.data);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setIsLoggedIn(false);
      });

    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/collections`, { headers: { Authorization: token! } })
      .then((res) => {
        setResults(res.data.results.collections);
        if (firstLoad) {
          setFirstLoad(false);
          setLoading(false);
          document.title = "Flip-Flaap - Dashboard"
        }
      })
      .catch(() => {
        if (firstLoad) {
          setFirstLoad(false);
          setLoading(false);
        }
        setResults([]);
      });
    dispatch(menuChange(false));
  }, [token, firstLoad, menuChangeValue, dispatch]);

  const renderView = () => {
    if (mode === "Flashcard") return <FlashcardList />;
    if (mode === "Learn") return <Learn />;
    if (mode === "Practice") return <Practice />;
  };

  const renderMainScreen = () => {
    if (loading && firstLoad) return <LoadingScreen />;
    else
      return (
        <div className="wrapper-content">
          <MenuLeft collectionNames={results}></MenuLeft>
          <div className="main-page">
            <Navbar
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setMode={setMode}
              username={username}
              setFirstLoad={setFirstLoad}></Navbar>
            {openCollectionForm ? <CollectionForm /> : renderView()}
          </div>
        </div>
      );
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        renderMainScreen()
      ) : (
        <div className="wrapper-no-auth">
          <Navbar
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setFirstLoad={setFirstLoad}
            setMode={setMode}
            username={username}></Navbar>
          <GettingStarted />
        </div>
      )}
    </div>
  );
};

export default App;
