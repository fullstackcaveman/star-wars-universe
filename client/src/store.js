import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
	characterCreateReducer,
	characterDeleteReducer,
	characterInfoReducer,
	chracterListReducer,
	characterUpdateReducer,
} from './reducers/characterReducers';
import {
	planetInfoReducer,
	planetListReducer,
} from './reducers/planetReducers';
import {
	adminUserUpdateProfileReducer,
	userDetailsReducer,
	userDeleteReducer,
	userListReducer,
	userLoginReducer,
	userRegisterReducer,
	userUpdateProfileReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
	characterCreate: characterCreateReducer,
	characterDelete: characterDeleteReducer,
	characterInfo: characterInfoReducer,
	characterList: chracterListReducer,
	characterUpdate: characterUpdateReducer,
	planetInfo: planetInfoReducer,
	planetList: planetListReducer,
	userDelete: userDeleteReducer,
	userDetails: userDetailsReducer,
	userList: userListReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userUpdateProfile: userUpdateProfileReducer,
	adminUserUpdate: adminUserUpdateProfileReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
