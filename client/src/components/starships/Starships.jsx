import { Link } from 'react-router-dom';
import ItemCard from '../elements/ItemCard';
import Loader from '../elements/Loader';

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
					<Link
						to={`/starships/info/${starship.pretty_url}`}
						key={starship._id}
					>
						<ItemCard item={starship} loading={loading} />
					</Link>
				);
			})}
		</div>
	);
};

export default Starships;
