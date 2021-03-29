import axios from 'axios';
import {
	PLANET_LIST_REQUEST,
	PLANET_LIST_SUCCESS,
	PLANET_LIST_FAIL,
	PLANET_INFO_REQUEST,
	PLANET_INFO_SUCCESS,
	PLANET_INFO_FAIL,
	PLANET_DELETE_REQUEST,
	PLANET_DELETE_SUCCESS,
	PLANET_DELETE_FAIL,
	PLANET_CREATE_REQUEST,
	PLANET_CREATE_SUCCESS,
	PLANET_CREATE_FAIL,
	PLANET_UPDATE_REQUEST,
	PLANET_UPDATE_SUCCESS,
	PLANET_UPDATE_FAIL,
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

export const deletePlanet = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PLANET_DELETE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`/api/planets/${id}`, config);

		dispatch({
			type: PLANET_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: PLANET_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createPlanet = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: PLANET_CREATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post(`/api/planets`, {}, config);

		dispatch({
			type: PLANET_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PLANET_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updatePlanet = (planet) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PLANET_UPDATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(
			`/api/planets/${planet._id}`,
			planet,
			config
		);

		dispatch({
			type: PLANET_UPDATE_SUCCESS,
			payload: data,
		});

		dispatch({ type: PLANET_INFO_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: PLANET_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
