import * as Actions from './action';
import { HelloComponentState } from './types';

export const initialState = {
};

export default function channelReducer(state: HelloComponentState = initialState, action: any): HelloComponentState {
    console.log('helloComponent reducer', action.type, action, state, );
    switch (action.type) {
        case Actions.defaultEvent:
            return state;
        default:
            return state;
    }
}