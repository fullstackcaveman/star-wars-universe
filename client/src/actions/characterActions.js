import axios from 'axios';
import {
	CHARACTER_LIST_REQUEST,
	CHARACTER_LIST_SUCCESS,
	CHARACTER_LIST_FAIL,
	CHARACTER_INFO_REQUEST,
	CHARACTER_INFO_SUCCESS,
	CHARACTER_INFO_FAIL,
	CHARACTER_DELETE_REQUEST,
	CHARACTER_DELETE_SUCCESS,
	CHARACTER_DELETE_FAIL,
	CHARACTER_CREATE_REQUEST,
	CHARACTER_CREATE_SUCCESS,
	CHARACTER_CREATE_FAIL,
	CHARACTER_UPDATE_REQUEST,
	CHARACTER_UPDATE_SUCCESS,
	CHARACTER_UPDATE_FAIL,
} from '../constants/characterConstants';

export const listCharacters = () => async (dispatch) => {
	try {
		dispatch({ type: CHARACTER_LIST_REQUEST });

		const { data } = await axios.get('/api/characters');

		dispatch({
			type: CHARACTER_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: CHARACTER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listCharacterInfoByName = (name) => async (dispatch) => {
	try {
		dispatch({ type: CHARACTER_INFO_REQUEST });

		const { data } = await axios.get(`/api/characters/info/${name}`);

		dispatch({
			type: CHARACTER_INFO_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: CHARACTER_INFO_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listCharacterInfo = (id) => async (dispatch) => {
	try {
		dispatch({ type: CHARACTER_INFO_REQUEST });

		const { data } = await axios.get(`/api/characters/${id}`);

		dispatch({
			type: CHARACTER_INFO_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: CHARACTER_INFO_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteCharacter = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: CHARACTER_DELETE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`/api/characters/${id}`, config);

		dispatch({
			type: CHARACTER_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: CHARACTER_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createCharacter = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: CHARACTER_CREATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post(`/api/characters`, {}, config);

		dispatch({
			type: CHARACTER_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: CHARACTER_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateCharacter = (character) => async (dispatch, getState) => {
	try {
		dispatch({
			type: CHARACTER_UPDATE_REQUEST,
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
			`/api/characters/${character._id}`,
			character,
			config
		);

		dispatch({
			type: CHARACTER_UPDATE_SUCCESS,
			payload: data,
		});

		dispatch({ type: CHARACTER_INFO_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: CHARACTER_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
