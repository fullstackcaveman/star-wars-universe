import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Typography,
	Card,
	CardMedia,
	CardContent,
	Button,
} from '@material-ui/core';
import Loader from '../elements/Loader';
import Message from '../elements/Message';
import Background from '../elements/Background';

import { listFilmInfo, listFilmInfoByName } from '../../actions/filmActions';
import { NavLink } from 'react-router-dom';
import InfoArrayContainer from '../elements/InfoArrayContainer';
import { useLinkBuilder } from '../../hooks/useLinkBuilder';

const FilmInfo = ({ match, history }) => {
	const dispatch = useDispatch();

	const checked = useSelector((state) => state.adminShowEditBtn);
	const { adminShowEditBtn } = checked;

	const filmInfo = useSelector((state) => state.filmInfo);
	const { loading, error, film } = filmInfo;

	const {
		title,
		image,
		director,
		episode_id,
		opening_crawl,
		release_date,
		producer,
		// characters,
		// planets,
		// starships,
		// vehicles,
		// species,
	} = film;

	document.title = `Star Wars | ${film.title}`;

	useEffect(() => {
		if (match.params.id) {
			dispatch(listFilmInfo(match.params.id));
		} else {
			dispatch(listFilmInfoByName(match.params.pretty_url));
		}
	}, [match, dispatch]);

	// eslint-disable-next-line
	const [value, handleBuildLink, handleInfoClick] = useLinkBuilder();

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
											<Typography component='h3'>
												{`Release Date: ${release_date}`}
											</Typography>

											<Typography component='h3'>
												{`Director: ${director}`}
											</Typography>

											<div className='info-array-container'>
												<InfoArrayContainer
													baseModel={'producers'}
													model={'Producer'}
													arr={producer}
													infoClick={handleInfoClick}
												/>
											</div>
										</div>

										<div className='right-info'>
											<div className='info-array-container'>
												<Typography component='h3'>Opening Crawl:</Typography>
												<Typography component='p' className='info-array crawl'>
													{opening_crawl}
												</Typography>
											</div>
										</div>
									</div>

									{adminShowEditBtn ? (
										<NavLink to={`/admin/film/${film._id}/edit`}>
											<Button
												variant='contained'
												color='secondary'
												size='small'
												style={{ width: '50px' }}
											>
												EDIT
											</Button>
										</NavLink>
									) : null}
								</CardContent>
							</div>
						</Card>
						<div className='flex'></div>
					</>
				)}
			</div>
			<Background />
		</>
	);
};

export default FilmInfo;
