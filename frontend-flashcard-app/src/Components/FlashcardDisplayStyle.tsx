import "./FlashcardList.scss";
import listIcon from "../Icons/list.svg";
import listGridViewIcon from "../Icons/list-gridview.svg";

const FlashcardDisplayStyle = () => {
  const changeLookDisplay = (value: string) => {
    const el = document.querySelector(".flashcard-view");
    el?.classList.remove("individual-list");

    if (value === "list") {
      el?.classList.add("individual-list");
    }

  };
  return (
    <aside className="selector-display-style">
      <span>Appearance: </span>
      <img src={listIcon} alt="list" onClick={() => changeLookDisplay("list")} className="icon-display-style"></img>
      <img src={listGridViewIcon} alt="list-gridview" onClick={() => changeLookDisplay("grid")} className="icon-display-style"></img>

    </aside>
  );
};

export default FlashcardDisplayStyle;
