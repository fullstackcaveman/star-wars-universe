import RelatedPlanet from './RelatedPlanet';

const RelatedPlanets = ({ planets, handleInfoClick }) => {
	return (
		<div className='relatedItems-container'>
			<div className='item-title'>
				<h2>Related Planets</h2>
			</div>
			<div className='items'>
				{(planets || []).map((planet) => {
					return (
						<RelatedPlanet
							key={planet}
							planet={planet}
							handleInfoClick={handleInfoClick}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default RelatedPlanets;
