import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import { AuthContextProvider } from 'contexts/auth';
import { Global, css } from '@emotion/react';
import emotionReset from 'emotion-reset';

ReactDOM.render(
  <React.StrictMode>
    <Global
      styles={css`
        ${emotionReset}
      `}
    />
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
