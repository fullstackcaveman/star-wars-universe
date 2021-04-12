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

import { listCharacterInfo } from '../../actions/characterActions';
import { Link, NavLink } from 'react-router-dom';

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
		relatedPlanets,
		relatedStarships,
		relatedVehicles,
		relatedFilms,
	} = character;

	useEffect(() => {
		dispatch(listCharacterInfo(match.params.id));
	}, [match, dispatch]);

	document.title = `Star Wars | ${character.name}`;

	const handleClick = (query, model) => {
		console.log(query);

		const data = query.toLowerCase();

		console.log(data);

		const route = data.split(' ').join('-');

		console.log(route);

		history.push(`/${model}/${route}`);
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
											{!species ? (
												<Typography component='h3'>Species: unknown</Typography>
											) : (
												<Typography component='h3'>{`Species: ${species}`}</Typography>
											)}

											{!born ? (
												<Typography component='h3'>Birth: unknown</Typography>
											) : (
												<Typography component='h3'>{`Birth: ${born} BBY`}</Typography>
											)}

											{!gender ? (
												<Typography component='h3'>Gender: unknown</Typography>
											) : (
												<Typography component='h3'>{`Gender: ${gender}`}</Typography>
											)}

											{!height ? (
												<Typography component='h3'>Height: unknown</Typography>
											) : (
												<Typography component='h3'>{`Height: ${height}m`}</Typography>
											)}

											{!mass ? (
												<Typography component='h3'>Mass: unknown</Typography>
											) : (
												<Typography component='h3'>{`Mass: ${mass}kg`}</Typography>
											)}

											{!hairColor ? (
												<Typography component='h3'>Hair Color: n/a</Typography>
											) : (
												<Typography component='h3'>{`Hair Color: ${hairColor}`}</Typography>
											)}

											{!skinColor ? (
												<Typography component='h3'>Skin Color: n/a</Typography>
											) : (
												<Typography component='h3'>{`Skin Color: ${skinColor}`}</Typography>
											)}
										</div>
										<div className='right-info'>
											<div className='info-array-container'>
												<Typography component='h3'>
													Homeworld(s):{' '}
													{homeworld
														? homeworld.map((world) => {
																return (
																	<span
																		className='info-array'
																		key={world}
																		onClick={() =>
																			handleClick(world, 'planets')
																		}
																	>
																		{world}
																	</span>
																);
														  })
														: 'None'}
												</Typography>
											</div>

											<div className='info-array-container'>
												<Typography component='h3'>
													Masters:{' '}
													{masters
														? masters.map((master) => {
																return (
																	<span
																		className='info-array'
																		key={master}
																		onClick={() => handleClick()}
																	>
																		{master}
																	</span>
																);
														  })
														: 'None'}
												</Typography>
											</div>

											<div className='info-array-container'>
												<Typography component='h3'>
													Apprentices:{' '}
													{apprentices
														? apprentices.map((apprentice) => {
																return (
																	<span className='info-array' key={apprentice}>
																		{apprentice}
																	</span>
																);
														  })
														: 'None'}
												</Typography>
											</div>

											<div className='info-array-container'>
												<Typography component='h3'>
													Cybernetics:{' '}
													{cybernetics
														? cybernetics.map((cyber) => {
																return (
																	<span className='info-array' key={cyber}>
																		{cyber}
																	</span>
																);
														  })
														: null}
												</Typography>
											</div>

											<div className='info-array-container'>
												<Typography component='h3'>
													Affiliations:{' '}
													{affiliations
														? affiliations.map((affiliate) => {
																return (
																	<span className='info-array' key={affiliate}>
																		{affiliate}
																	</span>
																);
														  })
														: 'None'}
												</Typography>
											</div>

											<div className='info-array-container'>
												<Typography component='h3'>
													Former Affiliations:{' '}
													{formerAffiliations
														? formerAffiliations.map((fAffiliate) => {
																return (
																	<span className='info-array' key={fAffiliate}>
																		{fAffiliate}
																	</span>
																);
														  })
														: 'None'}
												</Typography>
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
