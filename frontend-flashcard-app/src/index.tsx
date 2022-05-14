import React from "react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { Provider } from 'react-redux'
import {store} from './app/store'
import SessionExpired from "./Pages/SessionExpired";
import UserProfile from "./Pages/UserProfile";
import Error404 from "./Pages/404";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/redirect" element={<SessionExpired/>}/>
        <Route path="/profile" element={<UserProfile/>}/>
        <Route path="/404" element={<Error404/>}/>
        <Route path="*" element={<Navigate replace to="/404"/>}/>
      </Routes>
    </HashRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
