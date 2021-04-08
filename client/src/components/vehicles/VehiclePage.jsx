import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Background from '../elements/Background';
import Loader from '../elements/Loader';
import Message from '../elements/Message';
import Vehicles from './Vehicles';
import Pagination from '../elements/Pagination';

import { listVehicles } from '../../actions/vehicleActions';

const VehiclePage = () => {
	const dispatch = useDispatch();

	const vehicleList = useSelector((state) => state.vehicleList);
	const { loading, error, vehicles } = vehicleList;

	const [currentPage, setCurrentPage] = useState(1);
	// Change this to set vehicles per page
	const [vehiclesPerPage] = useState(10);

	useEffect(() => {
		dispatch(listVehicles());
	}, [dispatch]);

	// Fix this - shouldn't run if vehicle fetch has an error
	// Sets structure of pagination
	useEffect(() => {
		const findPage1 = () => {
			const page1 = document.getElementById('page1');
			page1.classList.add('active');
		};
		setTimeout(() => findPage1(), 1000);
	}, []);

	const indexOfLastVehicle = currentPage * vehiclesPerPage;
	const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
	const currentVehicles = vehicles.slice(
		indexOfFirstVehicle,
		indexOfLastVehicle
	);
	// ######################^^^^^^^^^^^^########################

	// Controls which vehicles to display and button styling
	const paginate = (pageNumber) => {
		const thisPage = document.getElementById(`page${currentPage}`);
		thisPage.classList.remove('active');

		const newPage = document.getElementById(`page${pageNumber}`);
		newPage.classList.add('active');

		setCurrentPage(pageNumber);
	};

	const prevPage = () => {
		const newPage = currentPage - 1;
		if (currentPage > 1) {
			paginate(newPage);
		}
	};

	const nextPage = () => {
		const newPage = currentPage + 1;
		if (currentPage < vehicles.length / vehiclesPerPage) {
			paginate(newPage);
		}
	};

	return (
		<div className='list-page'>
			<h1>vehicles</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message severity='error' message={error} />
			) : (
				<>
					<Vehicles vehicles={currentVehicles} loading={loading} />
					<Pagination
						items={vehiclesPerPage}
						totalitems={vehicles.length}
						paginate={paginate}
						prev={prevPage}
						next={nextPage}
					/>
				</>
			)}

			<Background />
		</div>
	);
};

export default VehiclePage;
