import axios from 'axios';
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
	FILM_UPDATE_REQUEST,
	FILM_UPDATE_SUCCESS,
	FILM_UPDATE_FAIL,
} from '../constants/filmConstants';

export const listFilms = () => async (dispatch) => {
	try {
		dispatch({ type: FILM_LIST_REQUEST });

		const { data } = await axios.get('/api/films');

		dispatch({
			type: FILM_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: FILM_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listFilmInfo = (id) => async (dispatch) => {
	try {
		dispatch({ type: FILM_INFO_REQUEST });

		const { data } = await axios.get(`/api/films/${id}`);

		dispatch({
			type: FILM_INFO_SUCCESS,
			payload: data,
		});

		// dispatch({ type: FILM_INFO_RESET, payload: data });
	} catch (error) {
		dispatch({
			type: FILM_INFO_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteFilm = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: FILM_DELETE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`/api/films/${id}`, config);

		dispatch({
			type: FILM_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: FILM_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createFilm = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: FILM_CREATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post(`/api/films`, {}, config);

		dispatch({
			type: FILM_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: FILM_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateFilm = (film) => async (dispatch, getState) => {
	try {
		dispatch({
			type: FILM_UPDATE_REQUEST,
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

		const { data } = await axios.put(`/api/films/${film._id}`, film, config);

		dispatch({
			type: FILM_UPDATE_SUCCESS,
			payload: data,
		});

		dispatch({ type: FILM_INFO_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: FILM_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
