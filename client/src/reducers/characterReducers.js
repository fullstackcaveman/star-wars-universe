import {
	CHARACTER_LIST_REQUEST,
	CHARACTER_LIST_SUCCESS,
	CHARACTER_LIST_FAIL,
} from '../constants/characterConstants';

export const chracterListReducer = (state = { characters: [] }, action) => {
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
