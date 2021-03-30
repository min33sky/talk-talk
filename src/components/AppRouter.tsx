import React from 'react';
import Auth from 'pages/Auth';
import Home from 'pages/Home';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Profile from 'pages/Profile';

interface IProps {
  isLoggedIn: boolean;
}

export default function AppRouter({ isLoggedIn }: IProps) {
  return (
    <Router>
      <Switch>
        {!isLoggedIn && (
          <>
            <Route path="/auth" component={Auth}></Route>
            <Redirect path="*" to="/auth" />
          </>
        )}
        <Route exact path="/" component={Home}></Route>
        <Route path="/profile" component={Profile}></Route>
        <Redirect path="*" to="/" />
      </Switch>
    </Router>
  );
}
