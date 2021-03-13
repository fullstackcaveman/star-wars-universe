import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader';

// Lazy Load
const CharacterCard = lazy(() => import('./CharacterCard'));

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
					<Link to={`/characters/${character.id}`} key={character.id}>
						<Suspense fallback={Loader}>
							<CharacterCard character={character} loading={loading} />
						</Suspense>
					</Link>
				);
			})}
		</div>
	);
};

export default Characters;
