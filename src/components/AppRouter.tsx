import React from 'react';
import Auth from 'pages/Auth';
import Home from 'pages/Home';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Profile from 'pages/Profile';
import { useAuthState } from 'contexts/auth';
import Navigation from './Navigation';

export default function AppRouter() {
  const { isLoggedIn } = useAuthState();

  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/auth" component={Auth}></Route>
        <Route path="/profile" component={Profile}></Route>
        <Redirect path="*" to="/" />
      </Switch>
    </Router>
  );
}
