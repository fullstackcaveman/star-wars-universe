import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Background from '../elements/Background';
import Loader from '../elements/Loader';
import Message from '../elements/Message';
import Pagination from '../elements/Pagination';
import Items from '../elements/Items';

import { listCharacters } from '../../actions/characterActions';
import { listFilms } from '../../actions/filmActions';
import { listPlanets } from '../../actions/planetActions';
import { listSpecies } from '../../actions/speciesActions';
import { listStarships } from '../../actions/starshipActions';
import { listVehicles } from '../../actions/vehicleActions';
import { usePaginate } from '../../hooks/usePaginate';

const FilmPage = () => {
	const dispatch = useDispatch();

	const filmList = useSelector((state) => state.filmList);
	const { loading, error, films } = filmList;

	// Change this to set films per page
	const [filmsPerPage] = useState(10);

	useEffect(() => {
		dispatch(listCharacters());
		dispatch(listFilms());
		dispatch(listPlanets());
		dispatch(listSpecies());
		dispatch(listStarships());
		dispatch(listVehicles());
	}, [dispatch]);

	const [paginate, prevPage, currentPage] = usePaginate();

	const indexOfLastFilm = currentPage * filmsPerPage;
	const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
	const currentFilms = films.slice(indexOfFirstFilm, indexOfLastFilm);

	const nextPage = () => {
		const newPage = currentPage + 1;
		if (currentPage < films.length / filmsPerPage) {
			paginate(newPage);
		}
	};

	return (
		<div className='list-page'>
			<h1>Films</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message severity='error' message={error} />
			) : (
				<>
					<Items items={currentFilms} model='Films' loading={loading} />

					{films.length === 0 ? (
						<Pagination
							items={filmsPerPage}
							totalitems={films.length}
							paginate={paginate}
							prev={prevPage}
							next={nextPage}
						/>
					) : null}
				</>
			)}

			<Background />
		</div>
	);
};

export default FilmPage;
