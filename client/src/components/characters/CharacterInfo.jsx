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
import {
	listCharacterInfo,
	listCharacterInfoByName,
} from '../../actions/characterActions';
import { NavLink, useParams } from 'react-router-dom';
import InfoArrayContainer from '../elements/InfoArrayContainer';
import { useLinkBuilder } from '../../hooks/useLinkBuilder';
import RelatedItems from '../elements/RelatedItems';

import { listFilms } from '../../actions/filmActions';
import { listPlanets } from '../../actions/planetActions';
import { listSpecies } from '../../actions/speciesActions';
import { listStarships } from '../../actions/starshipActions';
import { listVehicles } from '../../actions/vehicleActions';

const CharacterInfo = ({ match }) => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	const checked = useSelector((state) => state.adminShowEditBtn);
	const { adminShowEditBtn } = checked;

	const characterInfo = useSelector((state) => state.characterInfo);
	const { loading: charLoader, error, character } = characterInfo;

	const allFilms = useSelector((state) => state.filmList);
	const { films } = allFilms;

	const allPlanets = useSelector((state) => state.planetList);
	const { planets } = allPlanets;

	const allStarships = useSelector((state) => state.starshipList);
	const { starships } = allStarships;

	const allVehicles = useSelector((state) => state.vehicleList);
	const { vehicles } = allVehicles;

	const {
		affiliations,
		apprentices,
		born,
		cybernetics,
		formerAffiliations,
		gender,
		hairColor,
		height,
		homeworld,
		name,
		mass,
		masters,
		relatedFilms,
		relatedPlanets,
		relatedStarships,
		relatedVehicles,
		skinColor,
		species,
	} = character;

	document.title = `Star Wars | ${character.name}`;

	const { pretty_url, id } = useParams();

	useEffect(() => {
		if (id) {
			dispatch(listCharacterInfo(id));
		} else {
			dispatch(listCharacterInfoByName(pretty_url));
		}
		dispatch(listFilms());
		dispatch(listPlanets());
		dispatch(listSpecies());
		dispatch(listStarships());
		dispatch(listVehicles());
		setTimeout(() => setLoading(charLoader), 2000);
		// eslint-disable-next-line
	}, [match, dispatch]);

	// eslint-disable-next-line
	const [value, handleBuildLink, handleInfoClick] = useLinkBuilder();

	const infoClick = (e) => {
		const model = e.target.attributes.model.value;
		const query = e.target.attributes.query.value;
		handleInfoClick(model, query);
	};

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
									alt={character.name}
									image={character.image}
								/>

								<CardContent className='card-data'>
									<div>
										<Typography component='h1'>{name}</Typography>
									</div>

									<div className='info-blocks'>
										<div className='left-info'>
											<Typography component='h3'>
												Species:{' '}
												<span
													className='pointer'
													model='species'
													query={species}
													onClick={infoClick}
												>
													{species}
												</span>
											</Typography>

											{born === undefined || born.length === 0 ? null : (
												<Typography component='h3'>
													{`Birth: ${born}`}
													<span className='small-text'>BBY</span>
												</Typography>
											)}

											{gender === undefined || gender === '' ? null : (
												<Typography component='h3'>
													{`Gender: ${gender}`}
												</Typography>
											)}

											{height === undefined || height === '' ? null : (
												<Typography component='h3'>
													{`Height: ${height}`}
													<span className='small-text'>m</span>
												</Typography>
											)}

											{mass === undefined || mass === '' ? null : (
												<Typography component='h3'>
													{`Mass: ${mass}`}
													<span className='small-text'>kg</span>
												</Typography>
											)}

											{hairColor === undefined ||
											hairColor.length === 0 ? null : (
												<Typography component='h3'>
													{`Hair Color: ${hairColor}`}
												</Typography>
											)}

											{skinColor === undefined || skinColor === '' ? null : (
												<Typography component='h3'>
													{`Skin Color: ${skinColor}`}
												</Typography>
											)}
										</div>

										<div className='right-info'>
											{homeworld === undefined ||
											homeworld.length === 0 ? null : (
												<div className='info-array-container'>
													<InfoArrayContainer
														addClass='info-array'
														baseModel={'planets'}
														model={'Homeworld'}
														arr={homeworld}
													/>
												</div>
											)}

											{masters === undefined || masters.length === 0 ? null : (
												<div className='info-array-container'>
													<InfoArrayContainer
														addClass='info-array'
														baseModel={'characters'}
														model={'Master'}
														arr={masters}
													/>
												</div>
											)}

											{apprentices === undefined ||
											apprentices.length === 0 ? null : (
												<div className='info-array-container'>
													<InfoArrayContainer
														addClass='info-array'
														baseModel={'characters'}
														model={'Apprentice'}
														arr={apprentices}
													/>
												</div>
											)}

											{cybernetics === undefined ||
											cybernetics.length === 0 ? null : (
												<div className='info-array-container'>
													<InfoArrayContainer
														addClass='info-array no-links'
														baseModel={'characters'}
														model={'Cybernetic'}
														arr={cybernetics}
													/>
												</div>
											)}

											{affiliations === undefined ||
											affiliations.length === 0 ? null : (
												<div className='info-array-container'>
													<InfoArrayContainer
														addClass='info-array no-links'
														baseModel={'affiliations'}
														model={'Affiliation'}
														arr={affiliations}
													/>
												</div>
											)}

											{formerAffiliations === undefined ||
											formerAffiliations.length === 0 ? null : (
												<div className='info-array-container'>
													<InfoArrayContainer
														baseModel={'formerAffiliations'}
														model={'Former Affiliation'}
														arr={formerAffiliations}
													/>
												</div>
											)}
										</div>
									</div>

									{adminShowEditBtn ? (
										<NavLink to={`/admin/character/${character._id}/edit`}>
											<Button
												variant='contained'
												color='secondary'
												size='small'
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

export default CharacterInfo;
