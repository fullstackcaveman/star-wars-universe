import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Background from '../elements/Background';
import Loader from '../elements/Loader';
import Message from '../elements/Message';
import Pagination from '../elements/Pagination';
import Items from '../elements/Items';

import { listVehicles } from '../../actions/vehicleActions';
import { listFilms } from '../../actions/filmActions';
import { usePaginate } from '../../hooks/usePaginate';

const VehiclePage = () => {
	const dispatch = useDispatch();

	const vehicleList = useSelector((state) => state.vehicleList);
	const { loading, error, vehicles } = vehicleList;

	// Change this to set vehicles per page
	const [vehiclesPerPage] = useState(12);

	useEffect(() => {
		dispatch(listVehicles());
		dispatch(listFilms());
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

	const [paginate, prevPage, currentPage] = usePaginate();

	const indexOfLastVehicle = currentPage * vehiclesPerPage;
	const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
	const currentVehicles = vehicles.slice(
		indexOfFirstVehicle,
		indexOfLastVehicle
	);
	// ######################^^^^^^^^^^^^########################

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
					<Items items={currentVehicles} model='Vehicles' loading={loading} />

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
