import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Card, CardMedia, CardContent } from '@material-ui/core';
import Loader from '../elements/Loader';
import Message from '../elements/Message';
import Background from '../elements/Background';

import { listFilmInfo } from '../../actions/filmActions';

const FilmInfo = ({ match }) => {
	const dispatch = useDispatch();

	const filmInfo = useSelector((state) => state.filmInfo);
	const { loading, error, film } = filmInfo;

	const {
		title,
		image,
		director,
		episode_id,
		opening_crawl,
		release_date,
		characters,
		producer,
		planets,
		starships,
		vehicles,
		species,
	} = film;

	document.title = `Star Wars | ${film.title}`;

	useEffect(() => {
		dispatch(listFilmInfo(match.params.id));
	}, [match, dispatch]);

	return (
		<>
			<div className='info-container'>
				{loading ? (
					<Loader />
				) : error ? (
					<Message severity='error' message={error} />
				) : (
					<>
						<Card className='info-card'>
							<div className='flex'>
								<CardMedia component='img' alt={title} image={image} />
								<CardContent className='card-data'>
									<div>
										<Typography component='h1'>
											{title}: {episode_id}
										</Typography>
									</div>
									<div className='info-blocks'>
										<div className='left-info'>
											{!release_date ? (
												<Typography component='h3'>
													Classification: unknown
												</Typography>
											) : (
												<Typography component='h3'>{`Release Date: ${release_date}`}</Typography>
											)}
											{!director ? (
												<Typography component='h3'>
													Classification: unknown
												</Typography>
											) : (
												<Typography component='h3'>{`Director: ${director}`}</Typography>
											)}

											<div className='info-array-container'>
												<Typography component='h3'>Producer(s):</Typography>
												<Typography component='p' className='info-array'>
													{(producer || []).map((producer) => (
														<span key={producer}>{`${producer}`}</span>
													))}
												</Typography>
											</div>
										</div>

										<div className='right-info'>
											{!opening_crawl ? (
												<Typography component='h3'>
													Opening Crawl: unknown
												</Typography>
											) : (
												<div className='info-array-container'>
													<Typography component='h3'>Opening Crawl:</Typography>
													<Typography
														component='p'
														className='info-array crawl'
													>
														{opening_crawl}
													</Typography>
												</div>
											)}
										</div>
									</div>
								</CardContent>
							</div>
						</Card>
						<div className='flex'>{/* <RelatedFilms /> */}</div>
					</>
				)}
			</div>
			<Background />
		</>
	);
};

export default FilmInfo;
