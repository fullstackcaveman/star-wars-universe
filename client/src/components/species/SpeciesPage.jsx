import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Background from '../elements/Background';
import Loader from '../elements/Loader';
import Message from '../elements/Message';
import Pagination from '../elements/Pagination';
import Items from '../elements/Items';

import { listSpecies } from '../../actions/speciesActions';
import { listCharacters } from '../../actions/characterActions';
import { listFilms } from '../../actions/filmActions';
import { usePaginate } from '../../hooks/usePaginate';

const SpeciesPage = () => {
	const dispatch = useDispatch();

	const speciesList = useSelector((state) => state.speciesList);
	const { loading, error, species } = speciesList;

	// Change this to set species per page
	const [speciesPerPage] = useState(10);

	useEffect(() => {
		dispatch(listSpecies());
		dispatch(listCharacters());
		dispatch(listFilms());
	}, [dispatch]);

	// Fix this - shouldn't run if species fetch has an error
	// Sets structure of pagination
	useEffect(() => {
		const findPage1 = () => {
			const page1 = document.getElementById('page1');
			page1.classList.add('active');
		};
		setTimeout(() => findPage1(), 1000);
	}, []);

	const [paginate, prevPage, currentPage] = usePaginate();

	const indexOfLastSpecies = currentPage * speciesPerPage;
	const indexOfFirstSpecies = indexOfLastSpecies - speciesPerPage;
	const currentSpecies = species.slice(indexOfFirstSpecies, indexOfLastSpecies);

	const nextPage = () => {
		const newPage = currentPage + 1;
		if (currentPage < species.length / speciesPerPage) {
			paginate(newPage);
		}
	};

	return (
		<div className='list-page'>
			<h1>Species</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message severity='error' message={error} />
			) : (
				<>
					<Items items={currentSpecies} model='Species' loading={loading} />

					<Pagination
						items={speciesPerPage}
						totalitems={species.length}
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

export default SpeciesPage;
