import { Link } from 'react-router-dom';
import Loader from '../Loader';
import CharacterCard from './CharacterCard';

const Characters = (props) => {
	const { characters, loading } = props;

	document.title = 'Star Wars Characters';

	if (loading) {
		return <Loader />;
	}

	return (
		<div className='characters-wrapper'>
			{characters.map((character) => {
				return (
					<Link to={`/characters/${character._id}`} key={character._id}>
						<CharacterCard character={character} loading={loading} />
					</Link>
				);
			})}
		</div>
	);
};

export default Characters;
