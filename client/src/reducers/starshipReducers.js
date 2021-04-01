import {
	STARSHIP_LIST_REQUEST,
	STARSHIP_LIST_SUCCESS,
	STARSHIP_LIST_FAIL,
	STARSHIP_INFO_REQUEST,
	STARSHIP_INFO_SUCCESS,
	STARSHIP_INFO_FAIL,
	STARSHIP_DELETE_REQUEST,
	STARSHIP_DELETE_SUCCESS,
	STARSHIP_DELETE_FAIL,
	STARSHIP_CREATE_REQUEST,
	STARSHIP_CREATE_SUCCESS,
	STARSHIP_CREATE_FAIL,
	STARSHIP_CREATE_RESET,
	STARSHIP_UPDATE_REQUEST,
	STARSHIP_UPDATE_SUCCESS,
	STARSHIP_UPDATE_FAIL,
	STARSHIP_UPDATE_RESET,
} from '../constants/starshipConstants';

export const starshipListReducer = (
	state = {
		starships: [],
	},
	action
) => {
	switch (action.type) {
		case STARSHIP_LIST_REQUEST:
			return { loading: true, starships: [] };
		case STARSHIP_LIST_SUCCESS:
			return { loading: false, starships: action.payload };
		case STARSHIP_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const starshipInfoReducer = (
	state = {
		starship: {},
	},
	action
) => {
	switch (action.type) {
		case STARSHIP_INFO_REQUEST:
			return { loading: true, ...state };
		case STARSHIP_INFO_SUCCESS:
			return { loading: false, starship: action.payload };
		case STARSHIP_INFO_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const starshipDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case STARSHIP_DELETE_REQUEST:
			return { loading: true };
		case STARSHIP_DELETE_SUCCESS:
			return { loading: false, success: true };
		case STARSHIP_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const starshipCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case STARSHIP_CREATE_REQUEST:
			return { loading: true };
		case STARSHIP_CREATE_SUCCESS:
			return { loading: false, success: true, starship: action.payload };
		case STARSHIP_CREATE_FAIL:
			return { loading: false, error: action.payload };
		case STARSHIP_CREATE_RESET:
			return {};
		default:
			return state;
	}
};

export const starshipUpdateReducer = (state = { starship: {} }, action) => {
	switch (action.type) {
		case STARSHIP_UPDATE_REQUEST:
			return { loading: true };
		case STARSHIP_UPDATE_SUCCESS:
			return { loading: false, success: true, starship: action.payload };
		case STARSHIP_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case STARSHIP_UPDATE_RESET:
			return { character: {} };
		default:
			return state;
	}
};
