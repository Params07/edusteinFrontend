import React from 'react';
import ReactDOM from 'react-dom/client';
import './CSSFILES/index.css';
import App from './App';
import { Notification } from './Components/Notification';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Notification/>
    <App />
  </React.StrictMode>
);


