import {
	PLANET_LIST_REQUEST,
	PLANET_LIST_SUCCESS,
	PLANET_LIST_FAIL,
	PLANET_INFO_REQUEST,
	PLANET_INFO_SUCCESS,
	PLANET_INFO_FAIL,
	PLANET_INFO_RESET,
	PLANET_DELETE_REQUEST,
	PLANET_DELETE_SUCCESS,
	PLANET_DELETE_FAIL,
	PLANET_CREATE_REQUEST,
	PLANET_CREATE_SUCCESS,
	PLANET_CREATE_FAIL,
	PLANET_CREATE_RESET,
	PLANET_UPDATE_REQUEST,
	PLANET_UPDATE_SUCCESS,
	PLANET_UPDATE_FAIL,
	PLANET_UPDATE_RESET,
} from '../constants/planetConstants';

export const planetListReducer = (
	state = {
		planets: [],
	},
	action
) => {
	switch (action.type) {
		case PLANET_LIST_REQUEST:
			return { loading: true, planets: [] };
		case PLANET_LIST_SUCCESS:
			return { loading: false, planets: action.payload };
		case PLANET_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const planetInfoReducer = (
	state = {
		planet: {},
	},
	action
) => {
	switch (action.type) {
		case PLANET_INFO_REQUEST:
			return { loading: true, ...state };
		case PLANET_INFO_SUCCESS:
			return { loading: false, planet: action.payload };
		case PLANET_INFO_FAIL:
			return { loading: false, error: action.payload };
		case PLANET_INFO_RESET:
			return {};
		default:
			return state;
	}
};

export const planetDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case PLANET_DELETE_REQUEST:
			return { loading: true };
		case PLANET_DELETE_SUCCESS:
			return { loading: false, success: true };
		case PLANET_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const planetCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case PLANET_CREATE_REQUEST:
			return { loading: true };
		case PLANET_CREATE_SUCCESS:
			return { loading: false, success: true, planet: action.payload };
		case PLANET_CREATE_FAIL:
			return { loading: false, error: action.payload };
		case PLANET_CREATE_RESET:
			return {};
		default:
			return state;
	}
};

export const planetUpdateReducer = (state = { planet: {} }, action) => {
	switch (action.type) {
		case PLANET_UPDATE_REQUEST:
			return { loading: true };
		case PLANET_UPDATE_SUCCESS:
			return { loading: false, success: true, planet: action.payload };
		case PLANET_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case PLANET_UPDATE_RESET:
			return { planet: {} };
		default:
			return state;
	}
};
