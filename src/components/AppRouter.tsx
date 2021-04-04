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
        <>
          {!isLoggedIn && (
            <>
              <Route path="/auth" component={Auth}></Route>
              <Redirect path="*" to="/auth" />
            </>
          )}
          {isLoggedIn && (
            <div
              style={{
                maxWidth: 890,
                width: '100%',
                margin: '0 auto',
                marginTop: 80,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Route exact path="/" component={Home}></Route>
              <Route path="/profile" component={Profile}></Route>
            </div>
          )}
        </>
      </Switch>
    </Router>
  );
}
