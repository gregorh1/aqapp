import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { logger } from 'redux-logger'

import './index.css';
import App from './App';
import reducer from './store/reducers';

const store = createStore(reducer, applyMiddleware(reduxThunk, logger));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
