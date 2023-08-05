import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter} from 'react-router-dom';
let date = new Date();
ReactDOM.render(
  <div>
   <BrowserRouter>
   <App />
   </BrowserRouter>
    
  </div>,
  document.getElementById("root")
);