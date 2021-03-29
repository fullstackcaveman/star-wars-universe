import axios from 'axios';
import {
	PLANET_LIST_REQUEST,
	PLANET_LIST_SUCCESS,
	PLANET_LIST_FAIL,
	PLANET_INFO_REQUEST,
	PLANET_INFO_SUCCESS,
	PLANET_INFO_FAIL,
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

export const listPlanetInfo = (id) => async (dispatch) => {
	try {
		dispatch({ type: PLANET_INFO_REQUEST });

		const { data } = await axios.get(`/api/planets/${id}`);

		dispatch({
			type: PLANET_INFO_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PLANET_INFO_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
