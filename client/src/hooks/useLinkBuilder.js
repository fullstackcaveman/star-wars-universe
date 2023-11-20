import { useState } from 'react';
import { useNavigate } from 'react-router';

export const useLinkBuilder = (input) => {
	const navigate = useNavigate();
	// eslint-disable-next-line
	const [value, setValue] = useState(input);

	const handleBuildLink = (map, model) => {
		if (model === 'characters') {
			return (
				<span className='info-array' key={map}>
					{map}
				</span>
			);
		}
	};

	const handleInfoClick = (model, query) => {
		if (query === 'None' || query === 'n/a') {
			return null;
		} else {
			const data = query.toLowerCase();

			const interim = data.replace("'", '-');

			const route = interim.split(' ').join('-');

			navigate(`/${model}/info/${route}`);
		}
	};

	return [value, handleBuildLink, handleInfoClick];
};
