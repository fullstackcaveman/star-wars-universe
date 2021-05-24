import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Background from '../elements/Background';
import Loader from '../elements/Loader';
import Message from '../elements/Message';
import Films from './Films';
import Pagination from '../elements/Pagination';

import { listFilms } from '../../actions/filmActions';
import { usePaginate } from '../../hooks/usePaginate';

const FilmPage = () => {
	const dispatch = useDispatch();

	const filmList = useSelector((state) => state.filmList);
	const { loading, error, films } = filmList;

	// Change this to set films per page
	const [filmsPerPage] = useState(10);

	useEffect(() => {
		dispatch(listFilms());
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
					<Films films={currentFilms} loading={loading} />
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
