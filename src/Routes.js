import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/signup">
        <Signup />
      </Route>
    </Switch>
  );
}