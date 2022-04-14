import axios from "axios";
import React from "react";
import ErrorMessage from "./ErrorMessage";

interface IActivity {
  title: string;
  concept: string;
  def: string;
  errorText: string;
  functionButton: Function;
}

export const PracticeLearnActivity = (props: React.PropsWithChildren<IActivity>) => {
  const { title, concept, def, errorText } = props;

  const renderCard = () => {
    if (concept)
      return (
        <div className="learn-flashcard">
          <div className="card-inner">
            <h2 className="title-flashcard card-front">
              Concept: <strong>{concept}</strong>
            </h2>
            <p className="def-text card-back">Definition: {def}</p>
          </div>
        </div>
      );
    else {
      if (errorText === "") return <p className="begin-text">Press start to begin</p>;
      return null;
    }
  };
  return (
    <div className="learn-flashcard-wrapper">
      <h1 className="title">{title}</h1>
      {renderCard()}
    </div>
  );
};

export const RenderButton = (props: React.PropsWithChildren<IActivity>) => {
  const { errorText, concept, functionButton } = props;
  if (errorText === "")
    return (
      <button onClick={() => functionButton()} className="btn-tertiary space-s">
        {concept ? "Next" : "Start"}
      </button>
    );
  else return <ErrorMessage textError={errorText} />;
};

export const Getdata = (
  currentCollection: string,
  setConcept: Function,
  setErrorText: Function,
  setResults: Function
) => {
  setConcept(""); //reinitialize value in case of change of collection
  setErrorText("");
  if (currentCollection !== "") {
    axios
      .get(`${process.env.REACT_APP_BACKEND}/api/flashcards`, { params: { currentCollection } })
      .then((res) => {
        setResults(res.data.results.collections[0].flashcards);
      })
      .catch((err) => setResults([]));
  }
};

export const checkCollectionSize = (listCollections: Array<Object>) => {
  if (listCollections[0] === undefined)
    return "Error: This collection is empty! Please create some flashcards and come back.";
  if (listCollections[1] === undefined)
    return "Error: This collection only contains one flashcard. Create at least 2 flashcards and come back.";
  return "";
};

// Creates a fake flashcard for the "swipe" animation
export const createFakeFlashcard = (concept: string, def: string) => {
  const main = document.querySelector(".main-view");

  const fakecard = document.createElement("div");
  fakecard.classList.add("learn-flashcard");

  // Only show the concept part of the card and not the full card
  // If flip animation is not activated then showing the full card makes sense
  const titleText = document.createElement("h2");
  titleText.textContent = `Concept ${(<strong>{concept}</strong>)}`;
  titleText.classList.add("title-flashcard");

/*
  const defText = document.createElement("p");
  defText.textContent = `Definition: ${def}`;
  defText.classList.add("def-text");
*/
  fakecard.appendChild(titleText);
 // fakecard.appendChild(defText);
  fakecard.classList.add("fake-card");
  main?.append(fakecard);

  setTimeout(() => {
    removeFakeFlashcard();
  }, 650); // Set shorter time than animation time
};

export const removeFakeFlashcard = () => {
  const element = document.getElementsByClassName("fake-card");
  while (element.length > 0) element[0].remove();
};
