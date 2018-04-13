import { config } from 'dotenv';
config();

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './styles/index.css';
import { Provider } from 'react-redux';
import SocketService from './services/socket.service';
import configureStore from './store/configureStore';
import { initialState as channelInitialState } from './store/channel/reducer';
import { initialState as mainInitialState } from './store/main/reducer';
import { initialState as helloComponentInitialState } from './store/helloComponent/reducer';

const store = configureStore({
    channelStore: channelInitialState,
    mainStore: mainInitialState,
    helloComponentStore: helloComponentInitialState,
});
SocketService._store = store;
SocketService.getInst().getSocketConnection(mainInitialState.user);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,

    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
