import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Background from '../elements/Background';
import Loader from '../elements/Loader';
import Message from '../elements/Message';
import Films from './Films';
import Pagination from '../elements/Pagination';

import { listFilms } from '../../actions/filmActions';

const FilmPage = () => {
	const dispatch = useDispatch();

	const filmList = useSelector((state) => state.filmList);
	const { loading, error, films } = filmList;

	const [currentPage, setCurrentPage] = useState(1);
	// Change this to set films per page
	const [filmsPerPage] = useState(10);

	useEffect(() => {
		dispatch(listFilms());
	}, [dispatch]);

	// useEffect(() => {
	// 	const findPage1 = () => {
	// 		const page1 = document.getElementById('page1');
	// 		page1.classList.add('active');
	// 	};
	// 	setTimeout(() => findPage1(), 1000);
	// }, []);

	const indexOfLastFilm = currentPage * filmsPerPage;
	const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
	const currentFilms = films.slice(indexOfFirstFilm, indexOfLastFilm);
	// ######################^^^^^^^^^^^^########################

	// Controls which films to display and button styling
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
