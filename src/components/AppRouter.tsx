import React from 'react';
import Auth from 'pages/Auth';
import Home from 'pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Profile from 'pages/Profile';
import { useAuthState } from 'contexts/auth';
import { AppLayout } from 'layouts/AppLayout';
import Navigation from './Navigation';

/**
 * 메인 라우터
 * @returns App Router Component
 */
export default function AppRouter() {
  const { isLoggedIn } = useAuthState();

  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <AppLayout isLoggedIn={isLoggedIn}>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route path="/auth" component={Auth}></Route>
        </Switch>
      </AppLayout>
    </Router>
  );
}
