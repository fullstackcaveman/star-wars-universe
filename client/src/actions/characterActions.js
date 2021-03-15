import {
	CHARACTER_LIST_REQUEST,
	CHARACTER_LIST_SUCCESS,
	CHARACTER_LIST_FAIL,
} from '../constants/characterConstants';
import axios from 'axios';

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
