import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Loader from '../elements/Loader';
import Message from '../elements/Message';
import Background from '../elements/Background';

import { listFilmInfo, listFilmInfoByName } from '../../actions/filmActions';
import { NavLink, useParams } from 'react-router-dom';
import { useLinkBuilder } from '../../hooks/useLinkBuilder';
import InfoArrayContainer from '../elements/InfoArrayContainer';
import RelatedItems from '../elements/RelatedItems';

import { listCharacters } from '../../actions/characterActions';
import { listPlanets } from '../../actions/planetActions';
import { listSpecies } from '../../actions/speciesActions';
import { listStarships } from '../../actions/starshipActions';
import { listVehicles } from '../../actions/vehicleActions';

const FilmInfo = ({ match }) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	const checked = useSelector((state) => state.adminShowEditBtn);
	const { adminShowEditBtn } = checked;

	const filmInfo = useSelector((state) => state.filmInfo);
	const { loading: filmLoader, error, film } = filmInfo;

	const allCharacters = useSelector((state) => state.characterList);
	const { characters } = allCharacters;

	const allPlanets = useSelector((state) => state.planetList);
	const { planets } = allPlanets;

	const allSpecies = useSelector((state) => state.speciesList);
	const { species } = allSpecies;

	const allStarships = useSelector((state) => state.starshipList);
	const { starships } = allStarships;

	const allVehicles = useSelector((state) => state.vehicleList);
	const { vehicles } = allVehicles;

	const {
		director,
		episode_id,
		image,
		opening_crawl,
		producer,
		relatedCharacters,
		relatedPlanets,
		relatedSpecies,
		relatedStarships,
		relatedVehicles,
		release_date,
		title,
	} = film;

	document.title = `Star Wars | ${film.title}`;

	const { pretty_url, id } = useParams();

	useEffect(() => {
		if (id) {
			dispatch(listFilmInfo(id));
		} else {
			dispatch(listFilmInfoByName(pretty_url));
		}
		dispatch(listCharacters());
		dispatch(listPlanets());
		dispatch(listSpecies());
		dispatch(listStarships());
		dispatch(listVehicles());

		setTimeout(() => setLoading(filmLoader), 2000);
		// eslint-disable-next-line
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
													addClass='info-array no-links'
													baseModel={'producers'}
													model={'Producer'}
													arr={producer}
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
						{relatedCharacters === undefined ||
						relatedCharacters.length === 0 ? null : (
							<div className='flex'>
								<RelatedItems
									items={relatedCharacters}
									related={characters}
									model='Characters'
									handleInfoClick={handleInfoClick}
								/>
							</div>
						)}
						{relatedSpecies === undefined ||
						relatedSpecies.length === 0 ? null : (
							<div className='flex'>
								<RelatedItems
									items={relatedSpecies}
									related={species}
									model='Species'
									handleInfoClick={handleInfoClick}
								/>
							</div>
						)}
						{relatedPlanets === undefined ||
						relatedPlanets.length === 0 ? null : (
							<div className='flex'>
								<RelatedItems
									items={relatedPlanets}
									related={planets}
									model='Planets'
									handleInfoClick={handleInfoClick}
								/>
							</div>
						)}
						{relatedVehicles === undefined ||
						relatedVehicles.length === 0 ? null : (
							<div className='flex'>
								<RelatedItems
									items={relatedVehicles}
									related={vehicles}
									model='Vehicles'
									handleInfoClick={handleInfoClick}
								/>
							</div>
						)}
						{relatedStarships === undefined ||
						relatedStarships.length === 0 ? null : (
							<div className='flex'>
								<RelatedItems
									items={relatedStarships}
									related={starships}
									model='Starships'
									handleInfoClick={handleInfoClick}
								/>
							</div>
						)}
					</>
				)}
			</div>
			<Background />
		</>
	);
};

export default FilmInfo;
