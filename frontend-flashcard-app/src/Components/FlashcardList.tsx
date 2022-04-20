import axios from "axios";
import { useEffect, useState } from "react";
import Flashcard from "./Flashcard";
import FormFlashcard from "./FormFlashcard";
import { IFlashcard } from "../Interfaces/InterfaceFlashcard";
import "./FlashcardList.scss";
import FlashcardDisplayStyle from "./FlashcardDisplayStyle";
import { useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { changeExpiredStatus } from "../features/expiredSessionSlice";
import { useDispatch } from "react-redux";

const FlashcardList = () => {
  const currentCollection = useAppSelector((state) => state.currentCollection.value);
  const currentCollectionId = useAppSelector((state) => state.currentCollection._id)
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [flashcards, setFlashcards] = useState<Array<IFlashcard>>([]);
  const [itemChange, setItemChange] = useState(false);
  const [showFlashcardForm, setShowFlashcardForm] = useState(false);

  useEffect(() => {
    if (currentCollection !== "") {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_BACKEND}/api/flashcards`,
        params: { currentCollectionId },
        headers: {Authorization: token!}
      }).then((res) => {
          setFlashcards(res.data.results.collections.flashcards);
          setItemChange(false);       
        })
        .catch((err) => {if (err.response.status === 403) {
          dispatch(changeExpiredStatus(true));
          navigate("/redirect")}
        });
    }
  }, [currentCollection, currentCollectionId, itemChange, token, navigate, dispatch]);

  const createCards = () => {
    return flashcards.map((card) => (
      <Flashcard
        setItemChange={setItemChange}
        key={card._id}
        collectionName={currentCollection}
        concept={card.concept}
        definition={card.definition}
        _id={card._id}
        date={card.date}
      />
    ));
  };

  const renderMainView = () => {
    if (currentCollection !== "")
      return (
        <main className="main-view">
          <h1 className="title title-list-cards">Collection: {currentCollection}</h1>
          <div className="flashcard-view">
            {createCards()} <FlashcardDisplayStyle />
          </div>
          <button
            onClick={() => setShowFlashcardForm(!showFlashcardForm)}
            className="btn-secondary btn-space">
            {!showFlashcardForm ? "Create new flashcard" : "Hide flashcard maker"}
          </button>
          {showFlashcardForm ? (
            <FormFlashcard setItemChange={setItemChange} />
          ) : null}
        </main>
      );
    else return  <main className="main-view"><h1 className="title-s">No collection is currently open</h1></main>;
  };

  return <div className="wrapper-main">{renderMainView()}</div>;
};

export default FlashcardList;
