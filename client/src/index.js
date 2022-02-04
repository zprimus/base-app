// dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// components
import App from './App';

// styles
import './index.css';

// app
import store, { Persistor } from './app/store.js';

ReactDOM.render(
  (
    <Provider store={store}>
      <PersistGate loading={null} persistor={ Persistor }>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  ),
  document.getElementById('root')
);
