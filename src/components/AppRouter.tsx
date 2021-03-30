import React from 'react';
import Auth from 'pages/Auth';
import Home from 'pages/Home';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/auth" component={Auth}></Route>
        <Redirect path="*" to="/auth" />
      </Switch>
    </Router>
  );
}
