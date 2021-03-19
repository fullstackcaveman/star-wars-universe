import React from 'react';
import Background from '../elements/Background';

const Planets = () => {
	document.title = 'Star Wars Planets';
	return (
		<>
			<div className='vehicles-container'></div>
			<Background />
		</>
	);
};

export default Planets;
