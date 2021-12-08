import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app';
// import constants from './config/config.json';

axios.defaults.baseURL = "http://ec2-54-176-106-32.us-west-1.compute.amazonaws.com/api";
axios.defaults.withCredentials = true;

ReactDOM.hydrate((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('root')); 