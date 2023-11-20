import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

const Pagination = ({ items, totalitems, paginate, prev, next }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalitems / items); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav className='pagination'>
			<li onClick={prev}>
				<p>
					<SkipPreviousIcon />
				</p>
			</li>
			<div className='numbers'>
				{pageNumbers.map((number) => (
					<li key={number} className={'page-item'} id={`page${number}`}>
						<p className='page-link' onClick={() => paginate(number)}>
							{number}
						</p>
					</li>
				))}
			</div>
			<li onClick={next}>
				<p>
					<SkipNextIcon />
				</p>
			</li>
		</nav>
	);
};

export default Pagination;
