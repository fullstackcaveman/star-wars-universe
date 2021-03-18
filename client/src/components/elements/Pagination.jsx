import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

const Pagination = ({
	charactersPerPage,
	totalCharacters,
	paginate,
	prev,
	next,
}) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalCharacters / charactersPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav className='pagination'>
			<li onClick={prev}>
				<p>
					<SkipPreviousIcon />
				</p>
			</li>
			{pageNumbers.map((number) => (
				<li key={number} className={'page-item'} id={`page${number}`}>
					<p className='page-link' onClick={() => paginate(number)}>
						{number}
					</p>
				</li>
			))}
			<li onClick={next}>
				<p>
					<SkipNextIcon />
				</p>
			</li>
		</nav>
	);
};

export default Pagination;
