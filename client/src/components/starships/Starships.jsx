import React from 'react';
import Background from '../Background';

const Starships = () => {
	document.title = 'Star Wars Starships';
	return (
		<>
			<div className='starships-container'></div>
			<Background />
		</>
	);
};

export default Starships;
