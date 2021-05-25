import { useSelector } from 'react-redux';

const RelatedFilm = ({ film, handleInfoClick }) => {
	const allFilms = useSelector((state) => state.filmList);
	const { films } = allFilms;

	const filmTitle = films.filter((title) => title.title === film);

	const handleClick = () => {
		handleInfoClick('films', filmTitle[0].title);
	};

	return (
		<div className='relatedItem-container' onClick={handleClick}>
			<img src={filmTitle[0].image} alt={film} />
			<h2>{film}</h2>
		</div>
	);
};

export default RelatedFilm;
