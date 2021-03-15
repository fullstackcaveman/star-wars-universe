import { useState, useEffect } from 'react';
import axios from 'axios';
import Background from '../Background';
// import Loader from '../Loader';
import Characters from './Characters';
import Pagination from '../Pagination';

const CharacterPage = () => {
	const [characters, setCharacters] = useState([]);
	const [loading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	// Change this to set characters per page
	const [charactersPerPage] = useState(10);

	const pages = document.querySelectorAll('.page-item');

	useEffect(() => {
		const fetchCharacters = async () => {
			const { data } = await axios
				.get('/api/characters')
				.catch((err) => console.log(err));

			setCharacters(data);
		};

		fetchCharacters();
	}, []);

	// Sets structure of pagination
	const indexOfLastCharacter = currentPage * charactersPerPage;
	const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
	const currentCharacters = characters.slice(
		indexOfFirstCharacter,
		indexOfLastCharacter
	);

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
			<Characters characters={currentCharacters} loading={loading} />
			<Pagination
				charactersPerPage={charactersPerPage}
				totalCharacters={characters.length}
				paginate={paginate}
				prev={prevPage}
				next={nextPage}
			/>

			<Background />
		</div>
	);
};

export default CharacterPage;
