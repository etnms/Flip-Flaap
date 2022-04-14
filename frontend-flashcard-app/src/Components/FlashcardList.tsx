import axios from "axios";
import React, { useEffect, useState } from "react";
import Flashcard from "./Flashcard";
import FormFlashcard from "./FormFlashcard";
import { IFlashcard } from "../Interfaces/InterfaceFlashcard";
import "./FlashcardList.scss";
import FlashcardDisplayStyle from "./FlashcardDisplayStyle";

interface INameCollection {
  currentCollection: string;
}

const FlashcardList = (props: React.PropsWithChildren<INameCollection>) => {
  const [flashcards, setFlashcards] = useState<Array<IFlashcard>>([]);

  const { currentCollection } = props;

  const [itemChange, setItemChange] = useState(false);

  const [showFlashcardForm, setShowFlashcardForm] = useState(false);

  useEffect(() => {
    if (currentCollection !== "") {
      axios
        .get(`${process.env.REACT_APP_BACKEND}/api/flashcards`, { params: { currentCollection } })
        .then((res) => {
          setFlashcards(res.data.results.collections[0].flashcards);
          setItemChange(false);
        })
        .catch((err) => console.log(err));
    }
  }, [currentCollection, itemChange]);

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
          <h1 className="title">Collection: {currentCollection}</h1>
          <div className="flashcard-view">
            {createCards()} <FlashcardDisplayStyle />
          </div>
          <button
            onClick={() => setShowFlashcardForm(!showFlashcardForm)}
            className="btn-secondary btn-space">
            {!showFlashcardForm ? "Create new flashcard" : "Hide flashcard maker"}
          </button>
          {showFlashcardForm ? (
            <FormFlashcard currentCollection={currentCollection} setItemChange={setItemChange} />
          ) : null}
        </main>
      );
    else return <p>No collection is open</p>;
  };

  return <div className="wrapper-main">{renderMainView()}</div>;
};

export default FlashcardList;
