import { Link } from 'react-router-dom';
import Loader from '../elements/Loader';
import StarshipCard from './StarshipCard';

const Starships = (props) => {
	document.title = 'Star Wars Starships';
	const { starships, loading } = props;

	if (loading) {
		return <Loader />;
	}

	return (
		<div className='characters-wrapper'>
			{starships.map((starship) => {
				return (
					<Link to={`/starships/${starship._id}`} key={starship._id}>
						<StarshipCard starship={starship} loading={loading} />
					</Link>
				);
			})}
		</div>
	);
};

export default Starships;
