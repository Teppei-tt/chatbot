import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./assets/styles/style.css";
import { Login } from "./components/login/login";
import { Top } from "./components/Top";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="/" component={Top} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
