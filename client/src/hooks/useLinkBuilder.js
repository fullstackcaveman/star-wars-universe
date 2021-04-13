import { useState, history } from 'react';

export const useLinkBuilder = (input) => {
	const [value, setValue] = useState();

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
		const data = query.toLowerCase();

		const route = data.split(' ').join('-');

		setValue({ linkTo: route });
		history.push(`/${model}/info/${route}`);
	};

	return [value, handleBuildLink, handleInfoClick];
};
