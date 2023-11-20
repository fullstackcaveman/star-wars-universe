import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Typography,
	Card,
	CardMedia,
	CardContent,
	Button,
} from '@mui/material';
import Loader from '../elements/Loader';
import Message from '../elements/Message';
import Background from '../elements/Background';
import {
	listPlanetInfo,
	listPlanetInfoByName,
} from '../../actions/planetActions';
import { NavLink } from 'react-router-dom';
import { useLinkBuilder } from '../../hooks/useLinkBuilder';
import RelatedItems from '../elements/RelatedItems';

import { listCharacters } from '../../actions/characterActions';
import { listFilms } from '../../actions/filmActions';
// import { listSpecies } from '../../actions/speciesActions';
// import { listStarships } from '../../actions/starshipActions';
// import { listVehicles } from '../../actions/vehicleActions';

const PlanetInfo = ({ match }) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	const checked = useSelector((state) => state.adminShowEditBtn);
	const { adminShowEditBtn } = checked;

	const planetInfo = useSelector((state) => state.planetInfo);
	const { loading: planetLoader, error, planet } = planetInfo;

	const allFilms = useSelector((state) => state.filmList);
	const { films } = allFilms;

	const allCharacters = useSelector((state) => state.characterList);
	const { characters } = allCharacters;

	const {
		climate,
		diameter,
		gravity,
		name,
		orbital_period,
		population,
		// pretty_url,
		relatedCharacters,
		relatedFilms,
		rotation_period,
		// suns,
		surface_water,
		terrain,
	} = planet;

	document.title = `Star Wars | ${planet.name}`;

	useEffect(() => {
		if (match.params.id) {
			dispatch(listPlanetInfo(match.params.id));
		} else {
			dispatch(listPlanetInfoByName(match.params.pretty_url));
		}
		dispatch(listFilms());
		dispatch(listCharacters());
		// dispatch(listSpecies());
		// dispatch(listStarships());
		// dispatch(listVehicles());
		setTimeout(() => setLoading(planetLoader), 2000);
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
								<CardMedia
									component='img'
									alt={planet.name}
									image={planet.image}
								/>

								<CardContent className='card-data'>
									<div>
										<Typography component='h1'>{name}</Typography>
									</div>

									<div className='info-blocks'>
										<div className='left-info'>
											{population === undefined ||
											population.length === 0 ? null : (
												<Typography component='h3'>
													{`Population: ${population}`}
													<span className='small-text'>Souls</span>
												</Typography>
											)}

											{rotation_period === undefined ||
											rotation_period.length === 0 ? null : (
												<Typography component='h3'>
													{`Rotation Period: ${rotation_period}`}
													<span className='small-text'>Days</span>
												</Typography>
											)}

											{orbital_period === undefined ||
											orbital_period.length === 0 ? null : (
												<Typography component='h3'>
													{`Orbital Period: ${orbital_period}`}
													<span className='small-text'>Days</span>
												</Typography>
											)}

											{diameter === undefined ||
											diameter.length === 0 ? null : (
												<Typography component='h3'>
													{`Diameter: ${diameter}`}
													<span className='small-text'>km</span>
												</Typography>
											)}

											{gravity === undefined || gravity.length === 0 ? null : (
												<Typography component='h3'>
													{`Gravity: ${gravity}`}
												</Typography>
											)}

											{terrain === undefined || terrain.length === 0 ? null : (
												<Typography component='h3'>
													{`Terrain: ${terrain}`}
												</Typography>
											)}

											{surface_water === undefined ||
											surface_water.length === 0 ? null : (
												<Typography component='h3'>
													{`Surface Water: ${surface_water}%`}
												</Typography>
											)}

											{climate === undefined || climate.length === 0 ? null : (
												<Typography component='h3'>
													{`Climate: ${climate}`}
												</Typography>
											)}
										</div>
									</div>

									{adminShowEditBtn ? (
										<NavLink to={`/admin/planet/${planet._id}/edit`}>
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
						{relatedFilms === undefined || relatedFilms.length === 0 ? null : (
							<div className='flex'>
								<RelatedItems
									items={relatedFilms}
									related={films}
									model='Films'
									handleInfoClick={handleInfoClick}
								/>
							</div>
						)}

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
					</>
				)}
			</div>
			<Background />
		</>
	);
};

export default PlanetInfo;
