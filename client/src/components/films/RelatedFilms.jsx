import RelatedFilm from './RelatedFilm';

const RelatedFilms = ({ films, handleInfoClick }) => {
	return (
		<div className='relatedItems-container'>
			<div className='item-title'>
				<h2>Related Films</h2>
			</div>
			<div className='items'>
				{(films || []).map((film) => {
					return (
						<RelatedFilm
							key={film}
							film={film}
							handleInfoClick={handleInfoClick}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default RelatedFilms;
