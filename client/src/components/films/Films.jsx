import { Link } from 'react-router-dom';
import Loader from '../elements/Loader';
import ItemCard from '../elements/ItemCard';

const Films = (props) => {
	document.title = 'Star Wars Films';
	const { films, loading } = props;

	if (loading) {
		return <Loader />;
	}

	return (
		<div className='characters-wrapper'>
			{films.map((film) => {
				return (
					<Link to={`/films/info/${film.pretty_url}`} key={film._id}>
						<ItemCard item={film} loading={loading} />
					</Link>
				);
			})}
		</div>
	);
};

export default Films;
