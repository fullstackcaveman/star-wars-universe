import RelatedFilm from './RelatedFilm';

const RelatedFilms = ({ films, handleInfoClick }) => {
	return (
		<div className='relatedFilms-container'>
			<div className='film-title'>
				<h2>Related Films</h2>
			</div>
			<div className='films'>
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
