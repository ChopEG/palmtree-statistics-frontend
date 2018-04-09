import { combineReducers, Reducer } from 'redux';
import chatReducer from './chat/reducer';
import mainReducer from './main/reducer';
import { MainState } from './main/types';
import { ChatState } from './chat/types';

export interface ApplicationState {
    chatStore: ChatState;
    mainStore: MainState;
}

// export default createStore(combineReducers({
//     mainStore: mainReducer,
//     chatStore: chatReducer
// }));

export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    mainStore: mainReducer,
    chatStore: chatReducer,
});
