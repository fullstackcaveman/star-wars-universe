import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Background from '../elements/Background';
import Loader from '../elements/Loader';
import Message from '../elements/Message';
import Characters from './Characters';
import Pagination from '../elements/Pagination';

import { listCharacters } from '../../actions/characterActions';
import { listVehicles } from '../../actions/vehicleActions';
import { listFilms } from '../../actions/filmActions';
import { usePaginate } from '../../hooks/usePaginate';

const CharacterPage = () => {
	const dispatch = useDispatch();

	const characterList = useSelector((state) => state.characterList);
	const { loading, error, characters } = characterList;

	const [charactersPerPage] = useState(10);

	useEffect(() => {
		dispatch(listCharacters());
		dispatch(listFilms());
		dispatch(listVehicles());
	}, [dispatch]);

	useEffect(() => {
		const findPage1 = () => {
			const page1 = document.getElementById('page1');
			page1.classList.add('active');
		};
		setTimeout(() => findPage1(), 1000);
	}, []);

	const [paginate, prevPage, currentPage] = usePaginate();

	const indexOfLastCharacter = currentPage * charactersPerPage;
	const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
	const currentCharacters = characters.slice(
		indexOfFirstCharacter,
		indexOfLastCharacter
	);

	const nextPage = () => {
		const newPage = currentPage + 1;
		if (currentPage < characters.length / charactersPerPage) {
			paginate(newPage);
		}
	};

	return (
		<div className='list-page'>
			<h1>Characters</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message severity='error' message={error} />
			) : (
				<>
					<Characters characters={currentCharacters} loading={loading} />
					<Pagination
						items={charactersPerPage}
						totalitems={characters.length}
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

export default CharacterPage;
