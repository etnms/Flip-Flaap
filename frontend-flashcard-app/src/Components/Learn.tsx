import { useState } from "react";
import {IResults, ICollection} from "../Interfaces/InterfaceResults";


const Learn = (props: React.PropsWithChildren<IResults>) => {
  const { currentCollection, results } = props;

  const [selectedCard, setSelectedCard] = useState([]);

  const displayCard = (maxNumberCards: number) => {
    const rdn = Math.floor(Math.random() * maxNumberCards + 1);
    return <p>Test</p>;
  };

  const getCollection = (listCollections: Array<ICollection>, numberCollections: number) => {
    for (let i = 0; i < numberCollections; i++) {
      console.log(listCollections[i].name);
      console.log(currentCollection)

      if (listCollections[i].name === currentCollection) console.log("hey" + listCollections[i].name);
      else console.log("shit");
    }
  };

  return (
    <main className="main-view">
      <button onClick={() => getCollection(results, results.length)}>Next</button>
    </main>
  );
};

export default Learn;
