import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Background from '../elements/Background';
import Loader from '../elements/Loader';
import Message from '../elements/Message';
import Starships from './Starships';
import Pagination from '../elements/Pagination';

import { listStarships } from '../../actions/starshipActions';

const StarshipPage = () => {
	const dispatch = useDispatch();

	const starshipList = useSelector((state) => state.starshipList);
	const { loading, error, starships } = starshipList;

	const [currentPage, setCurrentPage] = useState(1);
	// Change this to set starships per page
	const [starshipsPerPage] = useState(10);

	useEffect(() => {
		dispatch(listStarships());
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

	const indexOfLastStarship = currentPage * starshipsPerPage;
	const indexOfFirstStarship = indexOfLastStarship - starshipsPerPage;
	const currentStarships = starships.slice(
		indexOfFirstStarship,
		indexOfLastStarship
	);
	// ######################^^^^^^^^^^^^########################

	// Controls which starships to display and button styling
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
					<Starships starships={currentStarships} loading={loading} />
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
