import { useSelector } from 'react-redux';

const RelatedCharacter = ({ character, handleInfoClick }) => {
	const allCharacters = useSelector((state) => state.characterList);
	const { characters } = allCharacters;

	const characterInfo = characters.filter((item) => item.name === character);

	const handleClick = () => {
		handleInfoClick('characters', characterInfo[0].name);
	};

	return (
		<div className='relatedItem-container' onClick={handleClick}>
			<img src={characterInfo[0].image} alt={character} />
			<h2>{character}</h2>
		</div>
	);
};

export default RelatedCharacter;
