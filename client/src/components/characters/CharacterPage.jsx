import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Background from '../elements/Background';
import Loader from '../elements/Loader';
import Message from '../elements/Message';
import Characters from './Characters';
import Pagination from '../elements/Pagination';

import { listCharacters } from '../../actions/characterActions';

const CharacterPage = () => {
	const dispatch = useDispatch();

	const characterList = useSelector((state) => state.characterList);
	const { loading, error, characters } = characterList;

	const [currentPage, setCurrentPage] = useState(1);
	// Change this to set characters per page
	const [charactersPerPage] = useState(10);

	useEffect(() => {
		dispatch(listCharacters());
	}, [dispatch]);

	// Fix this - shouldn't run if character fetch has an error
	// Sets structure of pagination
	useEffect(() => {
		const findPage1 = () => {
			const page1 = document.getElementById('page1');
			page1.classList.add('active');
		};
		setTimeout(() => findPage1(), 500);
	}, []);

	const indexOfLastCharacter = currentPage * charactersPerPage;
	const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
	const currentCharacters = characters.slice(
		indexOfFirstCharacter,
		indexOfLastCharacter
	);
	// ######################^^^^^^^^^^^^########################

	// Controls which characters to display and button styling
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
		if (currentPage < characters.length / charactersPerPage) {
			paginate(newPage);
		}
	};

	return (
		<div className='character-page'>
			<h1>Characters</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message severity='error' message={error} />
			) : (
				<>
					<Characters characters={currentCharacters} loading={loading} />
					<Pagination
						charactersPerPage={charactersPerPage}
						totalCharacters={characters.length}
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
