import axios from 'axios';
import {
	VEHICLE_LIST_REQUEST,
	VEHICLE_LIST_SUCCESS,
	VEHICLE_LIST_FAIL,
	VEHICLE_INFO_REQUEST,
	VEHICLE_INFO_SUCCESS,
	VEHICLE_INFO_FAIL,
	VEHICLE_DELETE_REQUEST,
	VEHICLE_DELETE_SUCCESS,
	VEHICLE_DELETE_FAIL,
	VEHICLE_CREATE_REQUEST,
	VEHICLE_CREATE_SUCCESS,
	VEHICLE_CREATE_FAIL,
	VEHICLE_UPDATE_REQUEST,
	VEHICLE_UPDATE_SUCCESS,
	VEHICLE_UPDATE_FAIL,
} from '../constants/vehicleConstants';

export const listVehicles = () => async (dispatch) => {
	try {
		dispatch({ type: VEHICLE_LIST_REQUEST });

		const { data } = await axios.get('/api/vehicles');

		dispatch({
			type: VEHICLE_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: VEHICLE_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listVehicleInfoByName = (name) => async (dispatch) => {
	try {
		dispatch({ type: VEHICLE_INFO_REQUEST });

		const { data } = await axios.get(`/api/vehicles/info/${name}`);

		dispatch({
			type: VEHICLE_INFO_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: VEHICLE_INFO_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listVehicleInfo = (id) => async (dispatch) => {
	try {
		dispatch({ type: VEHICLE_INFO_REQUEST });

		const { data } = await axios.get(`/api/vehicles/${id}`);

		dispatch({
			type: VEHICLE_INFO_SUCCESS,
			payload: data,
		});

		// dispatch({ type: VEHICLE_INFO_RESET, payload: data });
	} catch (error) {
		dispatch({
			type: VEHICLE_INFO_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteVehicle = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: VEHICLE_DELETE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`/api/vehicles/${id}`, config);

		dispatch({
			type: VEHICLE_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: VEHICLE_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createVehicle = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: VEHICLE_CREATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post(`/api/vehicles`, {}, config);

		dispatch({
			type: VEHICLE_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: VEHICLE_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateVehicle = (vehicle) => async (dispatch, getState) => {
	try {
		dispatch({
			type: VEHICLE_UPDATE_REQUEST,
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
			`/api/vehicles/${vehicle._id}`,
			vehicle,
			config
		);

		dispatch({
			type: VEHICLE_UPDATE_SUCCESS,
			payload: data,
		});

		dispatch({ type: VEHICLE_INFO_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: VEHICLE_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
