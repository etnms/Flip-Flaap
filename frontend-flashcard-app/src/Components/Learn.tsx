import "./Learn.scss";
import { useEffect, useState } from "react";
import { IFlashcard } from "../Interfaces/InterfaceFlashcard";
import { IResults } from "../Interfaces/InterfaceResults";
import {
  checkCollectionSize,
  createFakeFlashcard,
  Getdata,
  PracticeLearnActivity,
  RenderButton,
} from "./PracticeLearnActivity";

const Learn = (props: React.PropsWithChildren<IResults>) => {
  const { currentCollection } = props;

  const [results, setResults] = useState([]);
  const [errorText, setErrorText] = useState(""); // Error message if problems with the selected collection

  const [concept, setConcept] = useState("");
  const [def, setDef] = useState("");

  const [previousRdn, setPreviousRdn] = useState<number>();

  useEffect(() => {
    Getdata(currentCollection, setConcept, setErrorText, setResults);
  }, [currentCollection]);

  const displayCard = (listCollections: Array<IFlashcard>) => {
    // Create a fake flashcard for every new card after the first one;
    if (concept) createFakeFlashcard(concept, def);

    // Check to see if there are at least 2 items in the collection, if so display flashcards;
    if (listCollections[0] !== undefined && listCollections[1] !== undefined) {
      // Create random number and loop until it's different from the previous one
      let rdn = 0;
      while (previousRdn === rdn) rdn = Math.floor(Math.random() * listCollections.length);
      // Set text corresponding to the randomly selected card
      setConcept(listCollections[rdn].concept);
      setDef(listCollections[rdn].definition);
      setPreviousRdn(rdn);
    }
    // Check the collection size. If it does not have 2 items then show an error message
    if (checkCollectionSize(listCollections) !== "") {
      setErrorText(checkCollectionSize(listCollections)!);
      return;
    }
    //Otherwise error value reinitialized
    setErrorText("");
  };

  return (
    <div className="wrapper-main">
      <main className="main-view">
        {currentCollection ? (
          <PracticeLearnActivity
            functionButton={() => displayCard(results)}
            title={`Collection: ${currentCollection}`}
            concept={concept}
            def={def}
            errorText={errorText}
          />     
        ) : (
          <h3 className="title-s">Select a collection to start learning.</h3>
        )}
        {currentCollection ? (
          <RenderButton
            functionButton={() => displayCard(results)}
            title={`Collection: ${currentCollection}`}
            concept={concept}
            def={def}
            errorText={errorText}
          />
        ) : null}
      </main>
    </div>
  );
};

export default Learn;
