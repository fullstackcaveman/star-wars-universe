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
import {
	listCharacterInfo,
	listCharacterInfoByName,
} from '../../actions/characterActions';
import { NavLink } from 'react-router-dom';
import InfoArrayContainer from '../elements/InfoArrayContainer';
import RelatedFilms from '../films/RelatedFilms';
import { listFilms } from '../../actions/filmActions';
import { useLinkBuilder } from '../../hooks/useLinkBuilder';

const CharacterInfo = ({ match, history }) => {
	const dispatch = useDispatch();

	const checked = useSelector((state) => state.adminShowEditBtn);
	const { adminShowEditBtn } = checked;

	const characterInfo = useSelector((state) => state.characterInfo);
	const { loading, error, character } = characterInfo;

	const {
		name,
		species,
		born,
		gender,
		height,
		mass,
		hairColor,
		skinColor,
		homeworld,
		cybernetics,
		affiliations,
		masters,
		apprentices,
		formerAffiliations,
		// relatedPlanets,
		// relatedStarships,
		// relatedVehicles,
		relatedFilms,
	} = character;

	document.title = `Star Wars | ${character.name}`;

	useEffect(() => {
		if (match.params.id) {
			dispatch(listCharacterInfo(match.params.id));
		} else {
			dispatch(listCharacterInfoByName(match.params.pretty_url));
		}
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
													model='species'
													query={species}
													onClick={infoClick}
												>
													{species}
												</span>
											</Typography>

											<Typography component='h3'>
												{`Birth: ${born} BBY`}
											</Typography>

											<Typography component='h3'>
												{`Gender: ${gender}`}
											</Typography>

											<Typography component='h3'>
												{`Height: ${height}m`}
											</Typography>

											<Typography component='h3'>
												{`Mass: ${mass}kg`}
											</Typography>

											<Typography component='h3'>
												{`Hair Color: ${hairColor}`}
											</Typography>

											<Typography component='h3'>
												{`Skin Color: ${skinColor}`}
											</Typography>
										</div>

										<div className='right-info'>
											<div className='info-array-container'>
												<InfoArrayContainer
													baseModel={'planets'}
													model={'Homeworld'}
													arr={homeworld}
													infoClick={infoClick}
												/>
											</div>

											<div className='info-array-container'>
												<InfoArrayContainer
													baseModel={'characters'}
													model={'Master'}
													arr={masters}
													infoClick={infoClick}
												/>
											</div>

											<div className='info-array-container'>
												<InfoArrayContainer
													baseModel={'characters'}
													model={'Apprentice'}
													arr={apprentices}
													infoClick={infoClick}
												/>
											</div>

											<div className='info-array-container'>
												<InfoArrayContainer
													baseModel={'characters'}
													model={'Cybernetic'}
													arr={cybernetics}
													infoClick={infoClick}
												/>
											</div>

											<div className='info-array-container'>
												<InfoArrayContainer
													baseModel={'affiliations'}
													model={'Affiliation'}
													arr={affiliations}
													infoClick={infoClick}
												/>
											</div>

											<div className='info-array-container'>
												<InfoArrayContainer
													baseModel={'formerAffiliations'}
													model={'Former Affiliation'}
													arr={formerAffiliations}
													infoClick={infoClick}
												/>
											</div>
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
						<div className='flex'>
							<RelatedFilms
								films={relatedFilms}
								handleInfoClick={handleInfoClick}
							/>
						</div>
					</>
				)}
			</div>
			<Background />
		</>
	);
};

export default CharacterInfo;
