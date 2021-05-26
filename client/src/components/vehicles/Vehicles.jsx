import { Link } from 'react-router-dom';
import ItemCard from '../elements/ItemCard';
import Loader from '../elements/Loader';

const Vehicles = (props) => {
	document.title = 'Star Wars Vehicles';
	const { vehicles, loading } = props;

	if (loading) {
		return <Loader />;
	}

	return (
		<div className='characters-wrapper'>
			{vehicles.map((vehicle) => {
				return (
					<Link to={`/vehicles/info/${vehicle.pretty_url}`} key={vehicle._id}>
						<ItemCard item={vehicle} loading={loading} />
					</Link>
				);
			})}
		</div>
	);
};

export default Vehicles;
