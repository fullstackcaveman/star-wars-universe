import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
	chracterListReducer,
	characterInfoReducer,
} from './reducers/characterReducers';

const reducer = combineReducers({
	characterList: chracterListReducer,
	characterInfo: characterInfoReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
