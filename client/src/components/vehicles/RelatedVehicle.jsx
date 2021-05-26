import { useSelector } from 'react-redux';

const RelatedVehicle = ({ vehicle, handleInfoClick }) => {
	const allVehicles = useSelector((state) => state.vehicleList);
	const { vehicles } = allVehicles;

	const vehicleInfo = vehicles.filter((item) => item.name === vehicle);

	const handleClick = () => {
		handleInfoClick('vehicles', vehicleInfo[0].name);
	};

	return (
		<div className='relatedItem-container' onClick={handleClick}>
			<img src={vehicleInfo[0].image} alt={vehicle} />
			<h2>{vehicle}</h2>
		</div>
	);
};

export default RelatedVehicle;
