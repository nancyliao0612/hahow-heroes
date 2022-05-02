import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./index.css";
import HeroList from "./pages/HeroList.js";
import { HeroProvider } from "./context/hero_context";

const root = ReactDOM.createRoot(
  document.getElementById("root"),
  // To solve the problem that Ant Design overrides existing CSS in the project by increasing the specificity of body element
  document.getElementsByTagName("body")[0].setAttribute("id", "body")
);
root.render(
  <HeroProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/heroes" />
        </Route>
        <Route path="/heroes">
          <HeroList />
        </Route>
      </Switch>
    </BrowserRouter>
  </HeroProvider>
);
