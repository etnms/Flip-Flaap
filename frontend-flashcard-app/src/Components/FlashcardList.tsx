import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Flashcard from "./Flashcard";
import FormFlashcard from "./FormFlashcard";
import { IFlashcard } from "../Interfaces/InterfaceFlashcard";
import "./FlashcardList.scss";
import FlashcardDisplayStyle from "./FlashcardDisplayStyle";
import { useAppSelector } from "../app/hooks";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { changeExpiredStatus } from "../features/expiredSessionSlice";
import { useDispatch } from "react-redux";
import ToDo from "./ToDo";
import { ITodo } from "../Interfaces/InterfaceToDo";
import { Dispatch } from "redux";

const FlashcardList = () => {
  const token = localStorage.getItem("token");

  const currentCollection: string = useAppSelector((state) => state.currentCollection.value);
  const currentCollectionId: string = useAppSelector((state) => state.currentCollection._id);
  const currentCollectionType: string = useAppSelector((state) => state.currentCollection.type);

  const dispatch: Dispatch<any> = useDispatch();
  const navigate: NavigateFunction = useNavigate();

  const [flashcards, setFlashcards] = useState<IFlashcard[]>([]);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [typeCard, setTypeCard] = useState<String>("");

  const [itemChange, setItemChange] = useState<boolean>(false);
  const [showFlashcardForm, setShowFlashcardForm] = useState<boolean>(false);

  useEffect(() => {
    // Get the query type to display flashcards or to dos depending on the user's choise
    const getQueryType = () => {
      let apiQuery: string;
      if (currentCollectionType === "to-do") apiQuery = "todos";
      else apiQuery = "flashcards";
      return apiQuery;
    };
    // Making sure the collection is not empty
    if (currentCollection !== "") {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_BACKEND}/api/${getQueryType()}`,
        params: { currentCollectionId },
        headers: { Authorization: token! },
      })
        .then((res) => {
          // Get results according to the type of collection
          if (getQueryType() === "flashcards") {
            const sortedRes = res.data.results.collections.flashcards.sort(
              (a: IFlashcard, b: IFlashcard) => a.dbIndex - b.dbIndex
            );
            setFlashcards(sortedRes);
            
          } else {
            const sortedRes = res.data.results.collections.todos.sort(
              (a: ITodo, b: ITodo) => a.dbIndex - b.dbIndex
            );
            setTodos(sortedRes);
          }
          setItemChange(false);
        })
        .catch((err) => {
          if (err.response.status === 403) {
            dispatch(changeExpiredStatus(true));
            navigate("/redirect");
          }
        });
    }
  }, [currentCollection, currentCollectionId, currentCollectionType, itemChange, token, navigate, dispatch]);

  const createCards = () => {
    if (currentCollectionType !== "to-do") {
      // const x = flashcards.sort((a,b) => a.dbIndex - b.dbIndex)
      return flashcards.map((card, i) => (
        <Flashcard
          setItemChange={setItemChange}
          key={card._id}
          concept={card.concept}
          definition={card.definition}
          _id={card._id}
          date={card.date}
          dbIndex={card.dbIndex}
          displayIndex={i}
          moveItemList={moveItemList}
          editFlashcardIndexes={editFlashcardIndexes}
        />
      ));
    }
    if (currentCollectionType === "to-do") {
      return todos.map((todo, i) => (
        <ToDo
          setItemChange={setItemChange}
          key={todo._id}
          todo={todo.todo}
          _id={todo._id}
          color={todo.color}
          date={todo.date}
          dbIndex={todo.dbIndex}
          displayIndex={i}
          moveItemList={moveItemList}
          editFlashcardIndexes={editFlashcardIndexes}
        />
      ));
    }
  };

  const moveItemList = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem: IFlashcard = flashcards[dragIndex];
      const hoverItem: IFlashcard = flashcards[hoverIndex];

      const dragItemTodo: ITodo = todos[dragIndex];
      const hoverItemTodo: ITodo = todos[hoverIndex];

      // Swap places of dragItem and hoverItem in the array
      if (currentCollectionType === "to-do") {
        setTodos((todo) => {
          const updatedTodo: ITodo[] = [...todo];
          updatedTodo[dragIndex] = hoverItemTodo;
          updatedTodo[hoverIndex] = dragItemTodo;
          return updatedTodo;
        });
      }
      if (currentCollectionType !== "to-do") {
        setFlashcards((flashcard) => {
          const updatedCard: IFlashcard[] = [...flashcard];
          updatedCard[dragIndex] = hoverItem;
          updatedCard[hoverIndex] = dragItem;
          return updatedCard;
        });
      }
    },
    [currentCollectionType, flashcards, todos]
  );

  const editFlashcardIndexes = (url: string) => {
    const typeCollection: ITodo[] | IFlashcard[] = currentCollectionType === "to-do" ? todos : flashcards;
    axios
      .put(
        `${url}`,
        {
          arrayCards: typeCollection,
        },
        { headers: { Authorization: token! } }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          navigate("/redirect");
          dispatch(changeExpiredStatus(true));
        }
      });
  };

  // useEffect for display of the different types
  useEffect(() => {
    const el: HTMLElement | null = document.querySelector(".flashcard-view");
    if (currentCollectionType === "to-do") {
      el?.classList.remove("individual-list");
      el?.classList.add("individual-list");
      setTypeCard("to do");
    } else {
      const displayType: string = localStorage.getItem("display") || "grid";
      if (displayType === "grid") el?.classList.remove("individual-list");
      setTypeCard("flashcard");
    }
  }, [currentCollectionType]);

  const renderMainView = () => {
    if (currentCollection !== "")
      return (
        <main className="main-view">
          {currentCollectionType !== "to-do" ? <FlashcardDisplayStyle /> : null}
          <h1 className="title title-list-cards">Collection: {currentCollection}</h1>
          <div className="flashcard-view">{createCards()}</div>
          <button
            onClick={() => setShowFlashcardForm(!showFlashcardForm)}
            className="btn-secondary btn-space">
            {!showFlashcardForm ? `Create new ${typeCard}` : `Hide ${typeCard} maker`}
          </button>
          {showFlashcardForm ? <FormFlashcard setItemChange={setItemChange} /> : null}
        </main>
      );
    else
      return (
        <main className="main-view">
          <h1 className="title-s">No collection is currently open</h1>
          <p>Tips: you can drag and drop your flashcards to organize them the way you want.</p>
        </main>
      );
  };

  return <div className="wrapper-main">{renderMainView()}</div>;
};

export default FlashcardList;
