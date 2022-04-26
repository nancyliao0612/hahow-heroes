import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import HeroList from "./pages/HeroList.js";
import HeroProfile from "./pages/HeroProfile.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path={"/heroes"} element={<HeroList />} />
      <Route exact path={`/heroes/:heroId`} element={<HeroProfile />} />
    </Routes>
  </BrowserRouter>
);
