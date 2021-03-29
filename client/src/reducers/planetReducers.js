import {
	PLANET_LIST_REQUEST,
	PLANET_LIST_SUCCESS,
	PLANET_LIST_FAIL,
	PLANET_INFO_REQUEST,
	PLANET_INFO_SUCCESS,
	PLANET_INFO_FAIL,
	PLANET_INFO_RESET,
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
