import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

import { App } from './components/app';
// import constants from './config/config.json';

axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.withCredentials = true;

ReactDOM.hydrate((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('root')); 