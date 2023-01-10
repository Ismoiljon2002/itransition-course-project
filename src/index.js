import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Context
import AllContexts from './context/index'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AllContexts>
      <App />
    </AllContexts>
  </React.StrictMode>
);