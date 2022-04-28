import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import HeroList from "./pages/HeroList.js";
import { HeroProvider } from "./context/hero_context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HeroProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/heroes">
          <HeroList />
        </Route>
      </Switch>
    </BrowserRouter>
  </HeroProvider>
);
