import { useSelector } from 'react-redux';

const RelatedVehicle = ({ vehicle, handleInfoClick }) => {
	const allVehicles = useSelector((state) => state.vehicleList);
	const { vehicles } = allVehicles;

	const vehicleName = vehicles.filter((item) => item.name === vehicle);

	const handleClick = () => {
		handleInfoClick('vehicles', vehicleName.name);
	};

	return (
		<div className='relatedItem-container' onClick={handleClick}>
			<img src={vehicleName[0].image} alt={vehicle} />
			<h2>{vehicle}</h2>
		</div>
	);
};

export default RelatedVehicle;
