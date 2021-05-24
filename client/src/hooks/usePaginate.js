import { useState } from 'react';

export const usePaginate = (input) => {
	const [currentPage, setCurrentPage] = useState(1);

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

	return [paginate, prevPage, currentPage];
};
