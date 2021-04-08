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
	VEHICLE_CREATE_RESET,
	VEHICLE_UPDATE_REQUEST,
	VEHICLE_UPDATE_SUCCESS,
	VEHICLE_UPDATE_FAIL,
	VEHICLE_UPDATE_RESET,
} from '../constants/vehicleConstants';

export const vehicleListReducer = (
	state = {
		vehicles: [],
	},
	action
) => {
	switch (action.type) {
		case VEHICLE_LIST_REQUEST:
			return { loading: true, vehicles: [] };
		case VEHICLE_LIST_SUCCESS:
			return { loading: false, vehicles: action.payload };
		case VEHICLE_LIST_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const vehicleInfoReducer = (
	state = {
		vehicle: {},
	},
	action
) => {
	switch (action.type) {
		case VEHICLE_INFO_REQUEST:
			return { loading: true, ...state };
		case VEHICLE_INFO_SUCCESS:
			return { loading: false, vehicle: action.payload };
		case VEHICLE_INFO_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const vehicleDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case VEHICLE_DELETE_REQUEST:
			return { loading: true };
		case VEHICLE_DELETE_SUCCESS:
			return { loading: false, success: true };
		case VEHICLE_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const vehicleCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case VEHICLE_CREATE_REQUEST:
			return { loading: true };
		case VEHICLE_CREATE_SUCCESS:
			return { loading: false, success: true, vehicle: action.payload };
		case VEHICLE_CREATE_FAIL:
			return { loading: false, error: action.payload };
		case VEHICLE_CREATE_RESET:
			return {};
		default:
			return state;
	}
};

export const vehicleUpdateReducer = (state = { vehicle: {} }, action) => {
	switch (action.type) {
		case VEHICLE_UPDATE_REQUEST:
			return { loading: true };
		case VEHICLE_UPDATE_SUCCESS:
			return { loading: false, success: true, vehicle: action.payload };
		case VEHICLE_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case VEHICLE_UPDATE_RESET:
			return { vehicle: {} };
		default:
			return state;
	}
};
