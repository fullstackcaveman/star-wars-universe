import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Background from '../elements/Background';
import Loader from '../elements/Loader';
import Message from '../elements/Message';
import Pagination from '../elements/Pagination';
import Items from '../elements/Items';

import { listStarships } from '../../actions/starshipActions';
import { usePaginate } from '../../hooks/usePaginate';
import { listFilms } from '../../actions/filmActions';

const StarshipPage = () => {
	const dispatch = useDispatch();

	const starshipList = useSelector((state) => state.starshipList);
	const { loading, error, starships } = starshipList;

	// Change this to set starships per page
	const [starshipsPerPage] = useState(12);

	useEffect(() => {
		dispatch(listStarships());
		dispatch(listFilms());
	}, [dispatch]);

	// Fix this - shouldn't run if character fetch has an error
	// Sets structure of pagination
	useEffect(() => {
		const findPage1 = () => {
			const page1 = document.getElementById('page1');
			page1.classList.add('active');
		};
		setTimeout(() => findPage1(), 1000);
	}, []);

	const [paginate, prevPage, currentPage] = usePaginate();

	const indexOfLastStarship = currentPage * starshipsPerPage;
	const indexOfFirstStarship = indexOfLastStarship - starshipsPerPage;
	const currentStarships = starships.slice(
		indexOfFirstStarship,
		indexOfLastStarship
	);
	// ######################^^^^^^^^^^^^########################

	const nextPage = () => {
		const newPage = currentPage + 1;
		if (currentPage < starships.length / starshipsPerPage) {
			paginate(newPage);
		}
	};

	return (
		<div className='list-page'>
			<h1>Starships</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message severity='error' message={error} />
			) : (
				<>
					<Items items={currentStarships} model='Starships' loading={loading} />

					<Pagination
						items={starshipsPerPage}
						totalitems={starships.length}
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

export default StarshipPage;
