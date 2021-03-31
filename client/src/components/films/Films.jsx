import { Link } from 'react-router-dom';
import Loader from '../elements/Loader';
import FilmCard from './FilmCard';

const Films = (props) => {
	document.title = 'Star Wars Films';
	const { films, loading } = props;

	console.log(films);

	if (loading) {
		return <Loader />;
	}

	return (
		<div className='characters-wrapper'>
			{films.map((film) => {
				return (
					<Link to={`/films/${film._id}`} key={film._id}>
						<FilmCard film={film} loading={loading} />
					</Link>
				);
			})}
		</div>
	);
};

export default Films;
