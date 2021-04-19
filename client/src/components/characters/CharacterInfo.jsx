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
// import { useLinkBuilder } from '../../hooks/useLinkBuilder';

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
		relatedPlanets,
		relatedStarships,
		relatedVehicles,
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

	// const handleInfoClick = useLinkBuilder();

	// console.log(handleInfoClick);

	const handleInfoClick = (model, query) => {
		if (query === 'None' || query === 'n/a') {
			return null;
		} else {
			const data = query.toLowerCase();

			const route = data.split(' ').join('-');

			history.push(`/${model}/info/${route}`);
		}
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
												{`Species: ${species}`}
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
													infoClick={handleInfoClick}
												/>
											</div>

											<div className='info-array-container'>
												<InfoArrayContainer
													baseModel={'characters'}
													model={'Master'}
													arr={masters}
													infoClick={handleInfoClick}
												/>
											</div>

											<div className='info-array-container'>
												<InfoArrayContainer
													baseModel={'characters'}
													model={'Apprentice'}
													arr={apprentices}
													infoClick={handleInfoClick}
												/>
											</div>

											<div className='info-array-container'>
												<InfoArrayContainer
													baseModel={'characters'}
													model={'Cybernetic'}
													arr={cybernetics}
													infoClick={handleInfoClick}
												/>
											</div>

											<div className='info-array-container'>
												<InfoArrayContainer
													baseModel={'affiliations'}
													model={'Affiliation'}
													arr={affiliations}
													infoClick={handleInfoClick}
												/>
											</div>

											<div className='info-array-container'>
												<InfoArrayContainer
													baseModel={'formerAffiliations'}
													model={'Former Affiliation'}
													arr={formerAffiliations}
													infoClick={handleInfoClick}
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
						<div className='flex'></div>
					</>
				)}
			</div>
			<Background />
		</>
	);
};

export default CharacterInfo;
