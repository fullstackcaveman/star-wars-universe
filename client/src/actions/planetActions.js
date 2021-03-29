import axios from 'axios';
import {
	PLANET_LIST_REQUEST,
	PLANET_LIST_SUCCESS,
	PLANET_LIST_FAIL,
} from '../constants/planetConstants';

export const listPlanets = () => async (dispatch) => {
	try {
		dispatch({ type: PLANET_LIST_REQUEST });

		const { data } = await axios.get('/api/planets');

		dispatch({
			type: PLANET_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PLANET_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
