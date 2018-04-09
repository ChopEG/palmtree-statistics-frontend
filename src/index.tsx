import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';

import { Provider } from 'react-redux';

import { combineReducers, createStore } from 'redux';

import mainReducer from './components/main/reducer';
import chatReducer from './components/chat/reducer';

let red = combineReducers({mainStore: mainReducer, chatStore: chatReducer});

const store = createStore(red);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,

    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
