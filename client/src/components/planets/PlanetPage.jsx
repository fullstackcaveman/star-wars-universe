import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Background from '../elements/Background';
import Loader from '../elements/Loader';
import Message from '../elements/Message';
import Planets from './Planets';
import Pagination from '../elements/Pagination';

import { listPlanets } from '../../actions/planetActions';
import { listFilms } from '../../actions/filmActions';

const PlanetPage = () => {
	const dispatch = useDispatch();

	const planetList = useSelector((state) => state.planetList);
	const { loading, error, planets } = planetList;

	const [currentPage, setCurrentPage] = useState(1);
	// Change this to set planets per page
	const [planetsPerPage] = useState(10);

	useEffect(() => {
		dispatch(listPlanets());
		dispatch(listFilms());
	}, [dispatch]);

	useEffect(() => {
		const findPage1 = () => {
			const page1 = document.getElementById('page1');
			page1.classList.add('active');
		};
		setTimeout(() => findPage1(), 500);
	}, []);

	const indexOfLastPlanet = currentPage * planetsPerPage;
	const indexOfFirstPlanet = indexOfLastPlanet - planetsPerPage;
	const currentPlanets = planets.slice(indexOfFirstPlanet, indexOfLastPlanet);

	// Controls which planets to display and button styling
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
		if (currentPage < planets.length / planetsPerPage) {
			paginate(newPage);
		}
	};

	return (
		<div className='list-page'>
			<h1>Planets</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message severity='error' message={error} />
			) : (
				<>
					<Planets planets={currentPlanets} loading={loading} />
					<Pagination
						items={planetsPerPage}
						totalitems={planets.length}
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

export default PlanetPage;
