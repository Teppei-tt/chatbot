import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./assets/styles/style.css";
import { Login } from "./components/login/login";
import { Home } from "./components/Home";
import { Page404 } from "./components/Page404";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/Home">
          <Home />
        </Route>
        <Route path="*">
          <Page404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
