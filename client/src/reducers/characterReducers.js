import {
	CHARACTER_LIST_REQUEST,
	CHARACTER_LIST_SUCCESS,
	CHARACTER_LIST_FAIL,
	CHARACTER_INFO_REQUEST,
	CHARACTER_INFO_SUCCESS,
	CHARACTER_INFO_FAIL,
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
