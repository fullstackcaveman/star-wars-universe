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
	filmListReducer,
	filmInfoReducer,
	filmDeleteReducer,
	filmCreateReducer,
	filmUpdateReducer,
} from './reducers/filmReducers';

import {
	planetCreateReducer,
	planetDeleteReducer,
	planetInfoReducer,
	planetListReducer,
	planetUpdateReducer,
} from './reducers/planetReducers';

import {
	speciesCreateReducer,
	speciesDeleteReducer,
	speciesInfoReducer,
	speciesListReducer,
	speciesUpdateReducer,
} from './reducers/speciesReducers';

import {
	starshipCreateReducer,
	starshipDeleteReducer,
	starshipInfoReducer,
	starshipListReducer,
	starshipUpdateReducer,
} from './reducers/starshipReducers';

import {
	adminUserUpdateProfileReducer,
	userDetailsReducer,
	userDeleteReducer,
	userListReducer,
	userLoginReducer,
	userRegisterReducer,
	userUpdateProfileReducer,
	adminShowEditBtnReducer,
} from './reducers/userReducers';

const reducer = combineReducers({
	adminShowEditBtn: adminShowEditBtnReducer,
	adminUserUpdate: adminUserUpdateProfileReducer,
	characterCreate: characterCreateReducer,
	characterDelete: characterDeleteReducer,
	characterInfo: characterInfoReducer,
	characterList: chracterListReducer,
	characterUpdate: characterUpdateReducer,
	filmCreate: filmCreateReducer,
	filmDelete: filmDeleteReducer,
	filmInfo: filmInfoReducer,
	filmList: filmListReducer,
	filmUpdate: filmUpdateReducer,
	planetCreate: planetCreateReducer,
	planetDelete: planetDeleteReducer,
	planetInfo: planetInfoReducer,
	planetList: planetListReducer,
	planetUpdate: planetUpdateReducer,
	speciesCreate: speciesCreateReducer,
	speciesDelete: speciesDeleteReducer,
	speciesInfo: speciesInfoReducer,
	speciesList: speciesListReducer,
	speciesUpdate: speciesUpdateReducer,
	starshipCreate: starshipCreateReducer,
	starshipDelete: starshipDeleteReducer,
	starshipInfo: starshipInfoReducer,
	starshipList: starshipListReducer,
	starshipUpdate: starshipUpdateReducer,
	userDelete: userDeleteReducer,
	userDetails: userDetailsReducer,
	userList: userListReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userUpdateProfile: userUpdateProfileReducer,
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
