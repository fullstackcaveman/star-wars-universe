import {
	SPECIES_LIST_REQUEST,
	SPECIES_LIST_SUCCESS,
	SPECIES_LIST_FAIL,
	SPECIES_INFO_REQUEST,
	SPECIES_INFO_SUCCESS,
	SPECIES_INFO_FAIL,
	SPECIES_DELETE_REQUEST,
	SPECIES_DELETE_SUCCESS,
	SPECIES_DELETE_FAIL,
	SPECIES_CREATE_REQUEST,
	SPECIES_CREATE_SUCCESS,
	SPECIES_CREATE_FAIL,
	SPECIES_UPDATE_REQUEST,
	SPECIES_UPDATE_SUCCESS,
	SPECIES_UPDATE_FAIL,
} from '../constants/speciesConstants.js';
import axios from 'axios';

export const listSpecies = () => async (dispatch) => {
	try {
		dispatch({ type: SPECIES_LIST_REQUEST });

		const { data } = await axios.get('/api/species');

		dispatch({
			type: SPECIES_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: SPECIES_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listSpeciesInfoByName = (name) => async (dispatch) => {
	try {
		dispatch({ type: SPECIES_INFO_REQUEST });

		const { data } = await axios.get(`/api/species/info/${name}`);

		dispatch({
			type: SPECIES_INFO_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: SPECIES_INFO_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listSpeciesInfo = (id) => async (dispatch) => {
	try {
		dispatch({ type: SPECIES_INFO_REQUEST });

		const { data } = await axios.get(`/api/species/${id}`);

		dispatch({
			type: SPECIES_INFO_SUCCESS,
			payload: data,
		});

		// dispatch({ type: SPECIES_INFO_RESET, payload: data });
	} catch (error) {
		dispatch({
			type: SPECIES_INFO_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteSpecies = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: SPECIES_DELETE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`/api/species/${id}`, config);

		dispatch({
			type: SPECIES_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: SPECIES_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createSpecies = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: SPECIES_CREATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post(`/api/species`, {}, config);

		dispatch({
			type: SPECIES_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: SPECIES_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateSpecies = (species) => async (dispatch, getState) => {
	try {
		dispatch({
			type: SPECIES_UPDATE_REQUEST,
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
			`/api/species/${species._id}`,
			species,
			config
		);

		dispatch({
			type: SPECIES_UPDATE_SUCCESS,
			payload: data,
		});

		dispatch({ type: SPECIES_INFO_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: SPECIES_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
