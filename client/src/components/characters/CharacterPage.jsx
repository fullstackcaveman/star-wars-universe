import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Background from '../Background';
import Loader from '../Loader';
import Message from '../Message';
import Characters from './Characters';
import Pagination from '../Pagination';

import { listCharacters } from '../../actions/characterActions';

const CharacterPage = () => {
	const dispatch = useDispatch();

	const characterList = useSelector((state) => state.characterList);
	const { loading, error, characters } = characterList;

	const [currentPage, setCurrentPage] = useState(1);
	// Change this to set characters per page
	const [charactersPerPage] = useState(10);

	const pages = document.querySelectorAll('.page-item');

	useEffect(() => {
		dispatch(listCharacters());
	}, [dispatch]);

	// Fix this - shouldn't run if character fetch has an error
	// Sets structure of pagination
	const indexOfLastCharacter = currentPage * charactersPerPage;
	const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
	const currentCharacters = characters.slice(
		indexOfFirstCharacter,
		indexOfLastCharacter
	);
	// ######################^^^^^^^^^^^^########################

	// Controls which characters to display and button styling
	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
		// Clears active class from all pagination items
		pages.forEach((page) => {
			page.classList.remove('active');
		});

		// Adds class 'active' to pagination element
		pages.forEach((page) => {
			if (page.id === `page${pageNumber}`) {
				page.classList.add('active');
			}
		});
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
