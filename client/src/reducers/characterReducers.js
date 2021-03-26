import {
	CHARACTER_LIST_REQUEST,
	CHARACTER_LIST_SUCCESS,
	CHARACTER_LIST_FAIL,
	CHARACTER_INFO_REQUEST,
	CHARACTER_INFO_SUCCESS,
	CHARACTER_INFO_FAIL,
	CHARACTER_DELETE_REQUEST,
	CHARACTER_DELETE_SUCCESS,
	CHARACTER_DELETE_FAIL,
	CHARACTER_CREATE_REQUEST,
	CHARACTER_CREATE_SUCCESS,
	CHARACTER_CREATE_FAIL,
	CHARACTER_CREATE_RESET,
	CHARACTER_UPDATE_REQUEST,
	CHARACTER_UPDATE_SUCCESS,
	CHARACTER_UPDATE_FAIL,
	CHARACTER_UPDATE_RESET,
	CHARACTER_INFO_RESET,
} from '../constants/characterConstants';

export const chracterListReducer = (
	state = {
		characters: [],
	},
	action
) => {
	switch (action.type) {
		case CHARACTER_LIST_REQUEST:
			return { loading: true, characters: [] };
		case CHARACTER_LIST_SUCCESS:
			return { loading: false, characters: action.payload };
		case CHARACTER_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const characterInfoReducer = (
	state = {
		character: {},
	},
	action
) => {
	switch (action.type) {
		case CHARACTER_INFO_REQUEST:
			return { loading: true, ...state };
		case CHARACTER_INFO_SUCCESS:
			return { loading: false, character: action.payload };
		case CHARACTER_INFO_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const characterDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case CHARACTER_DELETE_REQUEST:
			return { loading: true };
		case CHARACTER_DELETE_SUCCESS:
			return { loading: false, success: true };
		case CHARACTER_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const characterCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case CHARACTER_CREATE_REQUEST:
			return { loading: true };
		case CHARACTER_CREATE_SUCCESS:
			return { loading: false, success: true, character: action.payload };
		case CHARACTER_CREATE_FAIL:
			return { loading: false, error: action.payload };
		case CHARACTER_CREATE_RESET:
			return {};
		default:
			return state;
	}
};

export const characterUpdateReducer = (state = { character: {} }, action) => {
	switch (action.type) {
		case CHARACTER_UPDATE_REQUEST:
			return { loading: true };
		case CHARACTER_UPDATE_SUCCESS:
			return { loading: false, success: true, character: action.payload };
		case CHARACTER_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case CHARACTER_UPDATE_RESET:
			return { character: {} };
		default:
			return state;
	}
};
