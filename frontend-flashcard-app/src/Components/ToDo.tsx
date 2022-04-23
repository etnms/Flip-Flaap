import "../App.scss";
import "../SassStyles/icons.scss";
import "./ToDo.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import React, { useState } from "react";
import Loader from "./Loaders/Loader";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { defTypeText, formatDate } from "../helper/helper";
import { useNavigate } from "react-router-dom";
import { changeExpiredStatus } from "../features/expiredSessionSlice";
import { ITodo } from "../Interfaces/InterfaceToDo";

const ToDo = (props: React.PropsWithChildren<ITodo>) => {
    const { _id, collectionName, date, todo, setItemChange } = props;

    const token = localStorage.getItem("token");
  
    const [edit, setEdit] = useState(false);
  
    const type = useAppSelector((state) => state.currentCollection.type);
    
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
  
    const [todoText, setTodoText] = useState(todo);
  
    const [loadingDelete, setLoadingDelete] = useState(false);
    
    const deleteTodo = (_id: string, name: string, e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      setLoadingDelete(true);
      // Select the flashcard element for animation purposes
      const spanEl = (e.target as HTMLElement).parentElement; //span
      const flashcardEl = spanEl?.parentElement;
      axios
        .delete(`${process.env.REACT_APP_BACKEND}/api/todos`, {
          data: { _id, name },
          headers: { Authorization: token! },
        })
        .then(() => {
          // Animation only, the backedn takes care of the delete logic
          flashcardEl?.classList.add("deleted-item");
          // Time out before state refresh to see the updated collection
          // There's probably a better way to do that but it works
          setTimeout(() => setItemChange(true), 100);
          setLoadingDelete(false);
        })
        .catch((err) => {
          if (err.response.status === 403) {
            navigate("/redirect");
            dispatch(changeExpiredStatus(true));
          }
          setLoadingDelete(false);
        });
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLElement>, elementName: string) => {
      if (elementName === "definition-edit") setTodoText((e.target as HTMLInputElement).value);
    };
  
    const editTodo = () => {
      axios
        .put(
          `${process.env.REACT_APP_BACKEND}/api/todos`,
          {
            _id,
            definition: todoText,
          },
          { headers: { Authorization: token! } }
        )
        .then(() => {
          setEdit(false);
        })
        .catch((err) => {
          if (err.response.status === 403) {
            navigate("/redirect");
            dispatch(changeExpiredStatus(true));
          }
        });
    };
  
    const renderTodo = () => {
      if (edit) {
        return (
          <div className="to-do">
            <textarea
              name="definition-edit"
              value={`${todoText}`}
              className="edit-to-do-text edit-to-do"
              onChange={(e) => handleChange(e, "definition-edit")}></textarea>
            <p className="created-on-text">Created on: {<em>{formatDate(date)}</em>}</p>
            <span className="wrapper-btn-todos">
            <CheckIcon
                onClick={() => editTodo()}
                className="icon icon-edit"
                aria-label="button validate edit"
              />
              {renderDelBtn()}            
            </span>
          </div>
        );
      } else {
        return (
          <div className="to-do">
            <p className="def-text">
              {" "}
              <strong>{defTypeText(type)}</strong>: {todoText}
            </p>
            <p className="created-on-text">Created on: {<em>{formatDate(date)}</em>}</p>
            <span className="wrapper-btn-todos">
            <EditIcon
                onClick={() => setEdit(true)}
                className="icon icon-edit"
                aria-label="button validate edit"
              />
              {renderDelBtn()}
            </span>
          </div>
        );
      }
    };
  
    // Common delete button between view/edit modes
    const renderDelBtn = () => {
      // Loading animation if item is being deleted
      if (loadingDelete) return <Loader />;
      else
        return (
          <DeleteOutlinedIcon
            onClick={(e) => deleteTodo(_id, collectionName, e)}
            className="icon icon-delete"
            aria-label="button delete to do"
          />
        );
    };
  
    return renderTodo();
  };

export default ToDo;