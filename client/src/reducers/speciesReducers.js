import {
	SPECIES_LIST_REQUEST,
	SPECIES_LIST_SUCCESS,
	SPECIES_LIST_FAIL,
	SPECIES_INFO_REQUEST,
	SPECIES_INFO_SUCCESS,
	SPECIES_INFO_FAIL,
	SPECIES_DELETE_REQUEST,
	SPECIES_DELETE_SUCCESS,
	SPECIES_DELETE_FAIL,
	SPECIES_CREATE_REQUEST,
	SPECIES_CREATE_SUCCESS,
	SPECIES_CREATE_FAIL,
	SPECIES_CREATE_RESET,
	SPECIES_UPDATE_REQUEST,
	SPECIES_UPDATE_SUCCESS,
	SPECIES_UPDATE_FAIL,
	SPECIES_UPDATE_RESET,
} from '../constants/speciesConstants';

export const speciesListReducer = (
	state = {
		species: [],
	},
	action
) => {
	switch (action.type) {
		case SPECIES_LIST_REQUEST:
			return { loading: true, species: [] };
		case SPECIES_LIST_SUCCESS:
			return { loading: false, species: action.payload };
		case SPECIES_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const speciesInfoReducer = (
	state = {
		species: {},
	},
	action
) => {
	switch (action.type) {
		case SPECIES_INFO_REQUEST:
			return { loading: true, ...state };
		case SPECIES_INFO_SUCCESS:
			return { loading: false, species: action.payload };
		case SPECIES_INFO_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const speciesDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case SPECIES_DELETE_REQUEST:
			return { loading: true };
		case SPECIES_DELETE_SUCCESS:
			return { loading: false, success: true };
		case SPECIES_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const speciesCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case SPECIES_CREATE_REQUEST:
			return { loading: true };
		case SPECIES_CREATE_SUCCESS:
			return { loading: false, success: true, species: action.payload };
		case SPECIES_CREATE_FAIL:
			return { loading: false, error: action.payload };
		case SPECIES_CREATE_RESET:
			return {};
		default:
			return state;
	}
};

export const speciesUpdateReducer = (state = { species: {} }, action) => {
	switch (action.type) {
		case SPECIES_UPDATE_REQUEST:
			return { loading: true };
		case SPECIES_UPDATE_SUCCESS:
			return { loading: false, success: true, species: action.payload };
		case SPECIES_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case SPECIES_UPDATE_RESET:
			return { species: {} };
		default:
			return state;
	}
};
