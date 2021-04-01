import axios from 'axios';
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
	STARSHIP_UPDATE_REQUEST,
	STARSHIP_UPDATE_SUCCESS,
	STARSHIP_UPDATE_FAIL,
} from '../constants/starshipConstants';

export const listStarships = () => async (dispatch) => {
	try {
		dispatch({ type: STARSHIP_LIST_REQUEST });

		const { data } = await axios.get('/api/starships');

		dispatch({
			type: STARSHIP_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: STARSHIP_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listStarshipInfo = (id) => async (dispatch) => {
	try {
		dispatch({ type: STARSHIP_INFO_REQUEST });

		const { data } = await axios.get(`/api/starships/${id}`);

		dispatch({
			type: STARSHIP_INFO_SUCCESS,
			payload: data,
		});

		// dispatch({ type: STARSHIP_INFO_RESET, payload: data });
	} catch (error) {
		dispatch({
			type: STARSHIP_INFO_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteStarship = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: STARSHIP_DELETE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`/api/starships/${id}`, config);

		dispatch({
			type: STARSHIP_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: STARSHIP_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createStarship = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: STARSHIP_CREATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post(`/api/starships`, {}, config);

		dispatch({
			type: STARSHIP_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: STARSHIP_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateStarship = (starship) => async (dispatch, getState) => {
	try {
		dispatch({
			type: STARSHIP_UPDATE_REQUEST,
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
			`/api/starships/${starship._id}`,
			starship,
			config
		);

		dispatch({
			type: STARSHIP_UPDATE_SUCCESS,
			payload: data,
		});

		dispatch({ type: STARSHIP_INFO_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: STARSHIP_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
