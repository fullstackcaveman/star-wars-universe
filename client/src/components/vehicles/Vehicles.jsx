import React from 'react';
import Background from '../Background';

const Vehicles = () => {
	document.title = 'Star Wars Vehicles';
	return (
		<>
			<div className='vehicles-container'></div>
			<Background />
		</>
	);
};

export default Vehicles;
