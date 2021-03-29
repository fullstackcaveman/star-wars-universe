import { Link } from 'react-router-dom';
import Loader from '../elements/Loader';
import PlanetCard from './PlanetCard';

const Planets = (props) => {
	document.title = 'Star Wars | Planets';
	const { planets, loading } = props;

	if (loading) {
		return <Loader />;
	}

	return (
		<div className='planets-container'>
			{planets.map((planet) => {
				return (
					<Link to={`/planets/${planet._id}`} key={planet._id}>
						<PlanetCard planet={planet} loading={loading} />
					</Link>
				);
			})}
		</div>
	);
};

export default Planets;
