import React from 'react';
import ReactDOM from 'react-dom';

import Welcome from './pages/Welcome';
import NewClient from './pages/NewClient';

import "./index.css";

import reportWebVitals from './reportWebVitals';
import 'carbon-components/scss/globals/scss/styles.scss';

ReactDOM.render(
  <React.StrictMode>
    <NewClient />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
