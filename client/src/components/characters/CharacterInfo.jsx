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
import { NavLink } from 'react-router-dom';

const CharacterInfo = ({ match }) => {
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
	} = character;

	document.title = `Star Wars | ${character.name}`;

	useEffect(() => {
		dispatch(listCharacterInfo(match.params.id));
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
								<CardMedia
									component='img'
									alt={character.name}
									image={character.image}
								/>
								<CardContent className='card-data'>
									<Typography component='h1'>{name}</Typography>

									{!species ? (
										<Typography component='h3'>Species: unknown</Typography>
									) : (
										<Typography component='h3'>{`Species: ${species}`}</Typography>
									)}

									{!born ? (
										<Typography component='h3'>Birth: unknown</Typography>
									) : (
										<Typography component='h3'>{`Birth: ${born}BBY`}</Typography>
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

									{!homeworld ? (
										<Typography component='h3'>Homeworld: unknown</Typography>
									) : (
										<Typography component='h3'>{`Homeworld: ${homeworld}`}</Typography>
									)}

									{adminShowEditBtn ? (
										<NavLink to={`/admin/character/${character._id}/edit`}>
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
						<div className='flex'>{/* <RelatedFilms /> */}</div>
					</>
				)}
			</div>
			<Background />
		</>
	);
};

export default CharacterInfo;
