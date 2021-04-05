import React from 'react';
import Auth from 'pages/Auth';
import Home from 'pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Profile from 'pages/Profile';
import { useAuthState } from 'contexts/auth';
import Navigation from './Navigation';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const AppLayoutStyle = css`
  max-width: 890px;
  width: 100%;
  margin: 0 auto;
  margin-top: 80px;
  display: flex;
  justify-content: center;
`;

const AppLayout = styled.div<{ isLoggedIn: boolean }>`
  ${(props) => props.isLoggedIn && AppLayoutStyle}
`;

/**
 * 메인 라우터
 * @returns App Router Component
 */
export default function AppRouter() {
  const { isLoggedIn } = useAuthState();

  return (
    <Router>
      {isLoggedIn && <Navigation />}

      <Switch>
        <AppLayout isLoggedIn={isLoggedIn}>
          <Route exact path="/" component={Home}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route path="/auth" component={Auth}></Route>
        </AppLayout>
      </Switch>
    </Router>
  );
}
