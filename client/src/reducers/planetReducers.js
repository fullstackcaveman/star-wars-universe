import {
	PLANET_LIST_REQUEST,
	PLANET_LIST_SUCCESS,
	PLANET_LIST_FAIL,
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
