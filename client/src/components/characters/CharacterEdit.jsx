import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Avatar,
	Button,
	Grid,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core';
import Message from '../elements/Message';
import Loader from '../elements/Loader';
import Background from '../elements/Background';
import {
	listCharacterInfo,
	updateCharacter,
} from '../../actions/characterActions';
import { CHARACTER_UPDATE_RESET } from '../../constants/characterConstants';

const CharacterEdit = ({ match, history }) => {
	const characterId = match.params.id;

	const [characterForm, setCharacterForm] = useState({
		name: '',
		pretty_url: '',
		height: '',
		mass: '',
		gender: '',
		homeworld: [],
		wiki: '',
		image: '',
		born: '',
		bornLocation: '',
		died: '',
		diedLocation: '',
		species: '',
		hairColor: '',
		eyeColor: '',
		skinColor: '',
		cybernetics: [],
		affiliations: [],
		masters: [],
		apprentices: [],
		formerAffiliations: [],
		relatedPlanets: [],
		relatedStarships: [],
		relatedVehicles: [],
		relatedFilms: [],
	});

	const dispatch = useDispatch();

	const characterInfo = useSelector((state) => state.characterInfo);
	const { loading, error, character } = characterInfo;

	const characterUpdate = useSelector((state) => state.characterUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = characterUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: CHARACTER_UPDATE_RESET });
			history.push('/admin/characterlist');
		} else {
			if (!character.name || character._id !== characterId) {
				dispatch(listCharacterInfo(characterId));
			} else {
				setCharacterForm({
					name: character.name,
					pretty_url: character.pretty_url,
					height: character.height,
					mass: character.mass,
					gender: character.gender,
					homeworld: character.homeworld,
					wiki: character.wiki,
					image: character.image,
					born: character.born,
					bornLocation: character.bornLocation,
					died: character.died,
					diedLocation: character.diedLocation,
					species: character.species,
					hairColor: character.hairColor,
					eyeColor: character.eyeColor,
					skinColor: character.skinColor,
					cybernetics: character.cybernetics,
					affiliations: character.affiliations,
					masters: character.masters,
					apprentices: character.apprentices,
					formerAffiliations: character.formerAffiliations,
					relatedPlanets: character.relatedPlanets,
					relatedStarships: character.relatedStarships,
					relatedVehicles: character.relatedVehicles,
					relatedFilms: character.relatedFilms,
				});
			}
		}
	}, [character, characterId, dispatch, successUpdate, history]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateCharacter({
				_id: characterId,
				...characterForm,
			})
		);
	};

	const paperStyle = {
		// backgroundColor: 'black',
		padding: 20,
		height: 'auto',
		width: 250,
		margin: '20px auto',
	};

	const avatarStyle = { backgroundColor: '#ffee58', marginBottom: 10 };

	const inputStyle = {
		margin: '5px auto',
	};

	const submitBtnStyle = {
		marginTop: '10px',
		marginBottom: '20px',
		backgroundColor: '#ffee58',

		color: 'rgb(3, 53, 50)',
		fontFamily: 'Impact, sans-serif',
		fontSize: '1rem',
	};

	return (
		<>
			<Grid className='add-user'>
				<Paper elevation={10} style={paperStyle}>
					<Grid align='center'>
						<Avatar style={avatarStyle} />
						<Typography variant='h5' id='add-user-h2'>
							{`Edit ${character.name}`}
							{loadingUpdate && <Loader />}
							{errorUpdate && (
								<Message severity='error' message={errorUpdate} />
							)}
						</Typography>
					</Grid>
					{loading ? (
						<Loader />
					) : error ? (
						<Message severity='error' message={error} />
					) : (
						<form onSubmit={submitHandler}>
							<TextField
								style={inputStyle}
								label='Name'
								placeholder='Enter User Name'
								variant='outlined'
								size='small'
								fullWidth
								name='name'
								value={characterForm.name}
								onChange={(e) =>
									setCharacterForm({ ...characterForm, name: e.target.value })
								}
							/>

							<TextField
								style={inputStyle}
								label='Pretty URL'
								placeholder='Enter Pretty URL'
								variant='outlined'
								size='small'
								fullWidth
								name='pretty_url'
								value={characterForm.pretty_url}
								onChange={(e) =>
									setCharacterForm({
										...characterForm,
										pretty_url: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='Height'
								placeholder='Enter Height'
								variant='outlined'
								size='small'
								fullWidth
								name='height'
								value={characterForm.height}
								onChange={(e) =>
									setCharacterForm({ ...characterForm, height: e.target.value })
								}
							/>

							<TextField
								style={inputStyle}
								label='Mass'
								placeholder='Enter Mass'
								variant='outlined'
								size='small'
								fullWidth
								name='mass'
								value={characterForm.mass}
								onChange={(e) =>
									setCharacterForm({ ...characterForm, mass: e.target.value })
								}
							/>

							<TextField
								style={inputStyle}
								label='Gender'
								placeholder='Enter Gender'
								variant='outlined'
								size='small'
								fullWidth
								name='gender'
								value={characterForm.gender}
								onChange={(e) =>
									setCharacterForm({ ...characterForm, gender: e.target.value })
								}
							/>

							<TextField
								style={inputStyle}
								label='Homeworld'
								placeholder='Enter Homeworld'
								variant='outlined'
								size='small'
								fullWidth
								name='homeworld'
								value={characterForm.homeworld}
								onChange={(e) =>
									setCharacterForm({
										...characterForm,
										homeworld: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='Wiki'
								placeholder='Enter Wiki'
								variant='outlined'
								size='small'
								fullWidth
								name='wiki'
								value={characterForm.wiki}
								onChange={(e) =>
									setCharacterForm({ ...characterForm, wiki: e.target.value })
								}
							/>

							<TextField
								style={inputStyle}
								label='Image'
								placeholder='Enter Image'
								variant='outlined'
								size='small'
								fullWidth
								name='image'
								value={characterForm.image}
								onChange={(e) =>
									setCharacterForm({ ...characterForm, image: e.target.value })
								}
							/>

							<TextField
								style={inputStyle}
								label='Born'
								placeholder='Enter Born Year'
								variant='outlined'
								size='small'
								fullWidth
								name='born'
								value={characterForm.born}
								onChange={(e) =>
									setCharacterForm({ ...characterForm, born: e.target.value })
								}
							/>

							<TextField
								style={inputStyle}
								label='Born Location'
								placeholder='Enter Born Location'
								variant='outlined'
								size='small'
								fullWidth
								name='bornLocation'
								value={characterForm.bornLocation}
								onChange={(e) =>
									setCharacterForm({
										...characterForm,
										bornLocation: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='Died'
								placeholder='Enter Died Year'
								variant='outlined'
								size='small'
								fullWidth
								name='died'
								value={characterForm.died}
								onChange={(e) =>
									setCharacterForm({ ...characterForm, died: e.target.value })
								}
							/>

							<TextField
								style={inputStyle}
								label='Died Location'
								placeholder='Enter Died Location'
								variant='outlined'
								size='small'
								fullWidth
								name='diedLocation'
								value={characterForm.diedLocation}
								onChange={(e) =>
									setCharacterForm({
										...characterForm,
										diedLocation: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='Species'
								placeholder='Enter Species'
								variant='outlined'
								size='small'
								fullWidth
								name='species'
								value={characterForm.species}
								onChange={(e) =>
									setCharacterForm({
										...characterForm,
										species: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='Hair Color'
								placeholder='Enter Hair Color'
								variant='outlined'
								size='small'
								fullWidth
								name='hairColor'
								value={characterForm.hairColor}
								onChange={(e) =>
									setCharacterForm({
										...characterForm,
										hairColor: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='Eye Color'
								placeholder='Enter Eye Color'
								variant='outlined'
								size='small'
								fullWidth
								name='eyeColor'
								value={characterForm.eyeColor}
								onChange={(e) =>
									setCharacterForm({
										...characterForm,
										eyeColor: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='Skin Color'
								placeholder='Enter Skin Color'
								variant='outlined'
								size='small'
								fullWidth
								name='skinColor'
								value={characterForm.skinColor}
								onChange={(e) =>
									setCharacterForm({
										...characterForm,
										skinColor: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='Cybernetics'
								placeholder='Enter Cybernetics'
								variant='outlined'
								size='small'
								fullWidth
								name='cybernetics'
								value={characterForm.cybernetics}
								onChange={(e) =>
									setCharacterForm({
										...characterForm,
										cybernetics: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='Affiliations'
								placeholder='Enter Affiliations'
								variant='outlined'
								size='small'
								fullWidth
								name='affiliations'
								value={characterForm.affiliations}
								onChange={(e) =>
									setCharacterForm({
										...characterForm,
										affiliations: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='Masters'
								placeholder='Enter Masters'
								variant='outlined'
								size='small'
								fullWidth
								name='masters'
								value={characterForm.masters}
								onChange={(e) =>
									setCharacterForm({
										...characterForm,
										masters: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='Apprentices'
								placeholder='Enter Apprentices'
								variant='outlined'
								size='small'
								fullWidth
								name='apprentices'
								value={characterForm.apprentices}
								onChange={(e) =>
									setCharacterForm({
										...characterForm,
										apprentices: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='Former Affiliations'
								placeholder='Enter Former Affiliations'
								variant='outlined'
								size='small'
								fullWidth
								name='formerAffiliations'
								value={characterForm.formerAffiliations}
								onChange={(e) =>
									setCharacterForm({
										...characterForm,
										formerAffiliations: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='Related Planets'
								placeholder='Enter Related Planets'
								variant='outlined'
								size='small'
								fullWidth
								name='relatedPlanets'
								value={characterForm.relatedPlanets}
								onChange={(e) =>
									setCharacterForm({
										...characterForm,
										relatedPlanets: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='Related Starships'
								placeholder='Enter Related Starships'
								variant='outlined'
								size='small'
								fullWidth
								name='relatedStarships'
								value={characterForm.relatedStarships}
								onChange={(e) =>
									setCharacterForm({
										...characterForm,
										relatedStarships: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='Related Vehicles'
								placeholder='Enter Related Vehicles'
								variant='outlined'
								size='small'
								fullWidth
								name='relatedVehicles'
								value={characterForm.relatedVehicles}
								onChange={(e) =>
									setCharacterForm({
										...characterForm,
										relatedVehicles: e.target.value,
									})
								}
							/>

							<TextField
								style={inputStyle}
								label='Related Films'
								placeholder='Enter Related Films'
								variant='outlined'
								size='small'
								fullWidth
								name='relatedFilms'
								value={characterForm.relatedFilms}
								onChange={(e) =>
									setCharacterForm({
										...characterForm,
										relatedFilms: e.target.value,
									})
								}
							/>

							<Button
								style={submitBtnStyle}
								type='submit'
								color='primary'
								variant='contained'
								fullWidth
							>
								Update
							</Button>
						</form>
					)}
					<Typography variant='body2'>
						<Link to='/admin/characterList'>CANCEL</Link>
					</Typography>
				</Paper>
			</Grid>
			<Background />
		</>
	);
};

export default CharacterEdit;
