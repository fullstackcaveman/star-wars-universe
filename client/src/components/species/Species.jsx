import { Link } from 'react-router-dom';
import ItemCard from '../elements/ItemCard';
import Loader from '../elements/Loader';

const Species = (props) => {
	document.title = 'Star Wars Species';
	const { species, loading } = props;

	if (loading) {
		return <Loader />;
	}

	return (
		<div className='characters-wrapper'>
			{species.map((species) => {
				return (
					<Link to={`/species/${species._id}`} key={species._id}>
						<ItemCard item={species} loading={loading} />
					</Link>
				);
			})}
		</div>
	);
};

export default Species;
