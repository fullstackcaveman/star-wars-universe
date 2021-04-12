import { useState } from 'react';
import { Link } from 'react-router-dom';

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

	return [value, handleBuildLink];
};
