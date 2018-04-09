import { config } from 'dotenv';
config();

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.css';
import { Provider } from 'react-redux';
// import { combineReducers, createStore } from 'redux';
// import mainReducer from './components/main/reducer';
// import chatReducer from './components/chat/reducer';
import SocketService from './services/socket.service';
import configureStore from './store/configureStore';
// import { initialChatState } from "./store/chat/reducer";
// import { initialMainState } from "./store/main/reducer";

let id = 'user_' + (Math.floor(Math.random() * (1000001)) + 1000000);
const store = configureStore({
    chatStore: {
        messages: [],
        channel: {}
    },
    mainStore:  {
        advertId: 0,
        user: {
            id: id,
            nickname: id,
        },
        chats: [],
        usersOnline: []
    },
});
SocketService._store = store;
SocketService.getInst().getSocketConnection();

// let red = combineReducers({mainStore: mainReducer, chatStore: chatReducer});

// const store = createStore(combineReducers({
//     mainStore: mainReducer,
//     chatStore: chatReducer
// }));
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,

    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
