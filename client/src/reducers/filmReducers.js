import {
	FILM_LIST_REQUEST,
	FILM_LIST_SUCCESS,
	FILM_LIST_FAIL,
	FILM_INFO_REQUEST,
	FILM_INFO_SUCCESS,
	FILM_INFO_FAIL,
	FILM_DELETE_REQUEST,
	FILM_DELETE_SUCCESS,
	FILM_DELETE_FAIL,
	FILM_CREATE_REQUEST,
	FILM_CREATE_SUCCESS,
	FILM_CREATE_FAIL,
	FILM_CREATE_RESET,
	FILM_UPDATE_REQUEST,
	FILM_UPDATE_SUCCESS,
	FILM_UPDATE_FAIL,
	FILM_UPDATE_RESET,
} from '../constants/filmConstants';

export const filmListReducer = (
	state = {
		films: [],
	},
	action
) => {
	switch (action.type) {
		case FILM_LIST_REQUEST:
			return { loading: true, films: [] };
		case FILM_LIST_SUCCESS:
			return { loading: false, films: action.payload };
		case FILM_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const filmInfoReducer = (
	state = {
		film: {},
	},
	action
) => {
	switch (action.type) {
		case FILM_INFO_REQUEST:
			return { loading: true, ...state };
		case FILM_INFO_SUCCESS:
			return { loading: false, film: action.payload };
		case FILM_INFO_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const filmDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case FILM_DELETE_REQUEST:
			return { loading: true };
		case FILM_DELETE_SUCCESS:
			return { loading: false, success: true };
		case FILM_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const filmCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case FILM_CREATE_REQUEST:
			return { loading: true };
		case FILM_CREATE_SUCCESS:
			return { loading: false, success: true, film: action.payload };
		case FILM_CREATE_FAIL:
			return { loading: false, error: action.payload };
		case FILM_CREATE_RESET:
			return {};
		default:
			return state;
	}
};

export const filmUpdateReducer = (state = { film: {} }, action) => {
	switch (action.type) {
		case FILM_UPDATE_REQUEST:
			return { loading: true };
		case FILM_UPDATE_SUCCESS:
			return { loading: false, success: true, film: action.payload };
		case FILM_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case FILM_UPDATE_RESET:
			return { film: {} };
		default:
			return state;
	}
};
