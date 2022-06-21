import React from "react";
import App from "./App";
import { createRoot, Root } from "react-dom/client";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { Provider } from 'react-redux'
import {store} from './app/store'
import SessionExpired from "./Pages/SessionExpired";
import UserProfile from "./Pages/UserProfile";
import Error404 from "./Pages/404";

const container: HTMLElement = document.getElementById("root")!;
const root: Root = createRoot(container);

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
