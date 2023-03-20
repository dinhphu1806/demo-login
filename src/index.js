import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// redux store
import { store } from './redux/store';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store={store}>
    <BrowserRouter>
        <ToastContainer
            theme="dark"
            position="top-right"
            autoClose={500}
            closeOnClick
            pauseOnHover={false}
          />    
          {/* // xong import Toast tren */}
            {/* Same as */}
        <ToastContainer />
      <App />
    </BrowserRouter>
   </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
