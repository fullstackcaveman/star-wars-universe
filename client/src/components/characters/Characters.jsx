import { Link } from 'react-router-dom';
import ItemCard from '../elements/ItemCard';
import Loader from '../elements/Loader';

const Characters = (props) => {
	document.title = 'Star Wars Characters';
	const { characters, loading } = props;

	if (loading) {
		return <Loader />;
	}

	return (
		<div className='characters-wrapper'>
			{characters.map((character) => {
				return (
					<Link
						to={`/characters/info/${character.pretty_url}`}
						key={character._id}
					>
						<ItemCard item={character} loading={loading} />
					</Link>
				);
			})}
		</div>
	);
};

export default Characters;
