import React from 'react';
import Auth from 'pages/Auth';
import Home from 'pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

interface IProps {
  isLoggedIn: boolean;
}

export default function AppRoutes({ isLoggedIn }: IProps) {
  return (
    <Router>
      <Switch>
        {isLoggedIn && (
          <Route exact path="/">
            <Home />
          </Route>
        )}

        {!isLoggedIn && (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
}
