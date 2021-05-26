import { useSelector } from 'react-redux';

const RelatedPlanet = ({ planet, handleInfoClick }) => {
	const allPlanets = useSelector((state) => state.planetList);
	const { planets } = allPlanets;

	const planetInfo = planets.filter((item) => item.name === planet);

	const handleClick = () => {
		handleInfoClick('planets', planetInfo[0].name);
	};

	return (
		<div className='relatedItem-container' onClick={handleClick}>
			<img src={planetInfo[0].image} alt={planet} />
			<h2>{planet}</h2>
		</div>
	);
};

export default RelatedPlanet;
