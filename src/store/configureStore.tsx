import { ApplicationState, reducers } from './index';
import {
    // applyMiddleware,
    createStore,
    Store
} from 'redux';

export default function configureStore(
    // history: History,
    initialState: ApplicationState,
): Store<ApplicationState> {
    // create the composing function for our middlewares
    // const composeEnhancers = composeWithDevTools({});

    // We'll create our store with the combined reducers and the initial Redux state that
    // we'll be passing from our entry point.
    return createStore<ApplicationState>(
        reducers,
        initialState,
        // composeEnhancers(applyMiddleware(
        //     routerMiddleware(history),
        // )),
    );
}