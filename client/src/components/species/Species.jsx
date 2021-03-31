import { Link } from 'react-router-dom';
import Loader from '../elements/Loader';
import SpeciesCard from './SpeciesCard';

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
						<SpeciesCard species={species} loading={loading} />
					</Link>
				);
			})}
		</div>
	);
};

export default Species;
