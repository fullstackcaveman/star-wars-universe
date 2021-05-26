import { Link } from 'react-router-dom';
import ItemCard from '../elements/ItemCard';
import Loader from '../elements/Loader';

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
					<Link to={`/planets/info/${planet.pretty_url}`} key={planet._id}>
						<ItemCard item={planet} loading={loading} />
					</Link>
				);
			})}
		</div>
	);
};

export default Planets;
