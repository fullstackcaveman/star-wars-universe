import RelatedCharacter from './RelatedCharacter';

const RelatedCharacters = ({ characters, handleInfoClick }) => {
	return (
		<div className='relatedItems-container'>
			<div className='item-title'>
				<h2>Related Characters</h2>
			</div>
			<div className='items'>
				{(characters || []).map((character) => {
					return (
						<RelatedCharacter
							key={character}
							character={character}
							handleInfoClick={handleInfoClick}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default RelatedCharacters;
