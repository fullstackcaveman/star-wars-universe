import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Background from '../elements/Background';
import Loader from '../elements/Loader';
import Message from '../elements/Message';
import Pagination from '../elements/Pagination';
import Items from '../elements/Items';

import { listCharacters } from '../../actions/characterActions';
import { listPlanets } from '../../actions/planetActions';
import { listFilms } from '../../actions/filmActions';
import { usePaginate } from '../../hooks/usePaginate';

const PlanetPage = () => {
	const dispatch = useDispatch();

	const planetList = useSelector((state) => state.planetList);
	const { loading, error, planets } = planetList;

	// Change this to set planets per page
	const [planetsPerPage] = useState(12);

	useEffect(() => {
		dispatch(listPlanets());
		dispatch(listFilms());
		dispatch(listCharacters());
	}, [dispatch]);

	useEffect(() => {
		const findPage1 = () => {
			const page1 = document.getElementById('page1');
			page1.classList.add('active');
		};
		setTimeout(() => findPage1(), 1000);
	}, []);

	const [paginate, prevPage, currentPage] = usePaginate();

	const indexOfLastPlanet = currentPage * planetsPerPage;
	const indexOfFirstPlanet = indexOfLastPlanet - planetsPerPage;
	const currentPlanets = planets.slice(indexOfFirstPlanet, indexOfLastPlanet);

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
					<Items items={currentPlanets} model='Planets' loading={loading} />

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
