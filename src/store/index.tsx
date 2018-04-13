import { combineReducers, Reducer } from 'redux';
import channelReducer from './channel/reducer';
import mainReducer from './main/reducer';
import helloComponentReducer from './helloComponent/reducer';
import { MainState } from './main/types';
import { ChannelState } from './channel/types';
import { HelloComponentState } from './helloComponent/types';

export interface ApplicationState {
    channelStore: ChannelState;
    mainStore: MainState;
    helloComponentStore: HelloComponentState;
}

export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    mainStore: mainReducer,
    channelStore: channelReducer,
    helloComponentStore: helloComponentReducer,
});
