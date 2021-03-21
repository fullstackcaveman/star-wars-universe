import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
	chracterListReducer,
	characterInfoReducer,
	characterDeleteReducer,
} from './reducers/characterReducers';
import {
	adminUserUpdateProfileReducer,
	userDeleteReducer,
	userDetailsReducer,
	userListReducer,
	userLoginReducer,
	userRegisterReducer,
	userUpdateProfileReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
	characterDelete: characterDeleteReducer,
	characterInfo: characterInfoReducer,
	characterList: chracterListReducer,
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
