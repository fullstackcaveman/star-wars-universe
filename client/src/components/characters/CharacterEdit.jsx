import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHandleForm } from '../../hooks/useHandleForm';

import { DeleteForever } from '@mui/icons-material';
import Message from '../elements/Message';
import Loader from '../elements/Loader';
import Background from '../elements/Background';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {
	listCharacterInfo,
	updateCharacter,
} from '../../actions/characterActions';
import { CHARACTER_UPDATE_RESET } from '../../constants/characterConstants';

const CharacterEdit = () => {
	const params = useParams();
	const characterId = params.id;
	const navigate = useNavigate();

	const [
		characterForm,
		setCharacterForm,
		handleChange,
		handleArrayChange,
		handleAddItem,
		handleDelete,
	] = useHandleForm({
		name: '',
		pretty_url: '',
		height: '',
		mass: '',
		gender: '',
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
		homeworld: [],
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
			navigate('/admin/characterlist');
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
		// eslint-disable-next-line
	}, [character, characterId, dispatch, successUpdate, navigate]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateCharacter({
				_id: characterId,
				...characterForm,
			})
		);
	};

	const handleInputChange = (e) => {
		handleChange(e.target);
	};

	const paperStyle = {
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

	const arrayStyle = {
		border: '1px solid #bdbdbd',
		borderRadius: '5px',
		padding: '5px 0',
		margin: '5px 0',
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
								value={characterForm.name || ''}
								onChange={handleInputChange}
							/>

							<TextField
								style={inputStyle}
								label='Pretty URL'
								placeholder='Enter Pretty URL'
								variant='outlined'
								size='small'
								fullWidth
								name='pretty_url'
								value={characterForm.pretty_url || ''}
								onChange={handleInputChange}
							/>

							<TextField
								style={inputStyle}
								label='Species'
								placeholder='Enter Species'
								variant='outlined'
								size='small'
								fullWidth
								name='species'
								value={characterForm.species || ''}
								onChange={handleInputChange}
							/>

							<TextField
								style={inputStyle}
								label='Height'
								placeholder='Enter Height'
								variant='outlined'
								size='small'
								fullWidth
								name='height'
								value={characterForm.height || ''}
								onChange={handleInputChange}
							/>

							<TextField
								style={inputStyle}
								label='Mass'
								placeholder='Enter Mass'
								variant='outlined'
								size='small'
								fullWidth
								name='mass'
								value={characterForm.mass || ''}
								onChange={handleInputChange}
							/>

							<TextField
								style={inputStyle}
								label='Gender'
								placeholder='Enter Gender'
								variant='outlined'
								size='small'
								fullWidth
								name='gender'
								value={characterForm.gender || ''}
								onChange={handleInputChange}
							/>

							<TextField
								style={inputStyle}
								label='Wiki'
								placeholder='Enter Wiki'
								variant='outlined'
								size='small'
								fullWidth
								name='wiki'
								value={characterForm.wiki || ''}
								onChange={handleInputChange}
							/>

							<TextField
								style={inputStyle}
								label='Image'
								placeholder='Enter Image'
								variant='outlined'
								size='small'
								fullWidth
								name='image'
								value={characterForm.image || ''}
								onChange={handleInputChange}
							/>

							<TextField
								style={inputStyle}
								label='Born'
								placeholder='Enter Born Year'
								variant='outlined'
								size='small'
								fullWidth
								name='born'
								value={characterForm.born || ''}
								onChange={handleInputChange}
							/>

							<TextField
								style={inputStyle}
								label='Born Location'
								placeholder='Enter Born Location'
								variant='outlined'
								size='small'
								fullWidth
								name='bornLocation'
								value={characterForm.bornLocation || ''}
								onChange={handleInputChange}
							/>

							<TextField
								style={inputStyle}
								label='Died'
								placeholder='Enter Died Year'
								variant='outlined'
								size='small'
								fullWidth
								name='died'
								value={characterForm.died || ''}
								onChange={handleInputChange}
							/>

							<TextField
								style={inputStyle}
								label='Died Location'
								placeholder='Enter Died Location'
								variant='outlined'
								size='small'
								fullWidth
								name='diedLocation'
								value={characterForm.diedLocation || ''}
								onChange={handleInputChange}
							/>

							<TextField
								style={inputStyle}
								label='Hair Color'
								placeholder='Enter Hair Color'
								variant='outlined'
								size='small'
								fullWidth
								name='hairColor'
								value={characterForm.hairColor || ''}
								onChange={handleInputChange}
							/>

							<TextField
								style={inputStyle}
								label='Eye Color'
								placeholder='Enter Eye Color'
								variant='outlined'
								size='small'
								fullWidth
								name='eyeColor'
								value={characterForm.eyeColor || ''}
								onChange={handleInputChange}
							/>

							<TextField
								style={inputStyle}
								label='Skin Color'
								placeholder='Enter Skin Color'
								variant='outlined'
								size='small'
								fullWidth
								name='skinColor'
								value={characterForm.skinColor || ''}
								onChange={handleInputChange}
							/>

							<div className='planets' style={arrayStyle}>
								<Typography variant='body1'>Homeworld(s):</Typography>
								{(characterForm.homeworld || []).map((_world, index) => (
									<div key={index} className='homeworld'>
										<TextField
											variant='outlined'
											size='small'
											value={characterForm.homeworld[index]}
											name='homeworld'
											onChange={(e) => handleArrayChange(e, index, 'homeworld')}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('homeworld', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('homeworld')}
								>
									Add New Planet
								</Button>
							</div>

							<div className='cybernetics' style={arrayStyle}>
								<Typography variant='body1'>Cybernetics:</Typography>
								{(characterForm.cybernetics || []).map((_cyb, index) => (
									<div key={index} className='cybernetics'>
										<TextField
											variant='outlined'
											size='small'
											value={characterForm.cybernetics[index]}
											name='cybernetics'
											onChange={(e) =>
												handleArrayChange(e, index, 'cybernetics')
											}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('cybernetics', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('cybernetics')}
								>
									Add New Cybernetic
								</Button>
							</div>

							<div className='affiliations' style={arrayStyle}>
								<Typography variant='body1'>Affiliations:</Typography>
								{(characterForm.affiliations || []).map((_aff, index) => (
									<div key={index} className='affiliations'>
										<TextField
											variant='outlined'
											size='small'
											value={characterForm.affiliations[index]}
											name='affiliations'
											onChange={(e) =>
												handleArrayChange(e, index, 'affiliations')
											}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('affiliations', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('affiliations')}
								>
									Add New Affiliation
								</Button>
							</div>

							<div className='masters' style={arrayStyle}>
								<Typography variant='body1'>Masters:</Typography>
								{(characterForm.masters || []).map((_mas, index) => (
									<div key={index} className='masters'>
										<TextField
											variant='outlined'
											size='small'
											value={characterForm.masters[index]}
											name='masters'
											onChange={(e) => handleArrayChange(e, index, 'masters')}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('masters', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('masters')}
								>
									Add New Master
								</Button>
							</div>

							<div className='apprentices' style={arrayStyle}>
								<Typography variant='body1'>Apprentices:</Typography>
								{(characterForm.apprentices || []).map((_app, index) => (
									<div key={index} className='apprentices'>
										<TextField
											variant='outlined'
											size='small'
											value={characterForm.apprentices[index]}
											name='apprentices'
											onChange={(e) =>
												handleArrayChange(e, index, 'apprentices')
											}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('apprentices', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('apprentices')}
								>
									Add New Apprentice
								</Button>
							</div>

							<div className='formerAffiliations' style={arrayStyle}>
								<Typography variant='body1'>Former Affiliations:</Typography>
								{(characterForm.formerAffiliations || []).map((_fa, index) => (
									<div key={index} className='formerAffiliations'>
										<TextField
											variant='outlined'
											size='small'
											value={characterForm.formerAffiliations[index]}
											name='formerAffiliations'
											onChange={(e) =>
												handleArrayChange(e, index, 'formerAffiliations')
											}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('formerAffiliations', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('formerAffiliations')}
								>
									Add New Affiliation
								</Button>
							</div>

							<div className='relatedPlanets' style={arrayStyle}>
								<Typography variant='body1'>Related Planets:</Typography>
								{(characterForm.relatedPlanets || []).map((_rp, index) => (
									<div key={index} className='relatedPlanets'>
										<TextField
											variant='outlined'
											size='small'
											value={characterForm.relatedPlanets[index]}
											name='relatedPlanets'
											onChange={(e) =>
												handleArrayChange(e, index, 'relatedPlanets')
											}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('relatedPlanets', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('relatedPlanets')}
								>
									Add New Planet
								</Button>
							</div>

							<div className='relatedStarships' style={arrayStyle}>
								<Typography variant='body1'>Related Starships:</Typography>
								{(characterForm.relatedStarships || []).map((_rs, index) => (
									<div key={index} className='relatedStarships'>
										<TextField
											variant='outlined'
											size='small'
											value={characterForm.relatedStarships[index]}
											name='relatedStarships'
											onChange={(e) =>
												handleArrayChange(e, index, 'relatedStarships')
											}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('relatedStarships', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('relatedStarships')}
								>
									Add New Starship
								</Button>
							</div>

							<div className='relatedVehicles' style={arrayStyle}>
								<Typography variant='body1'>Related Vehicles:</Typography>
								{(characterForm.relatedVehicles || []).map((_rv, index) => (
									<div key={index} className='relatedVehicles'>
										<TextField
											variant='outlined'
											size='small'
											value={characterForm.relatedVehicles[index]}
											name='relatedVehicles'
											onChange={(e) =>
												handleArrayChange(e, index, 'relatedVehicles')
											}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('relatedVehicles', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('relatedVehicles')}
								>
									Add New Vehicle
								</Button>
							</div>

							<div className='relatedFilms' style={arrayStyle}>
								<Typography variant='body1'>Related Films:</Typography>
								{(characterForm.relatedFilms || []).map((_rf, index) => (
									<div key={index} className='relatedFilms'>
										<TextField
											variant='outlined'
											size='small'
											value={characterForm.relatedFilms[index]}
											name='relatedFilms'
											onChange={(e) =>
												handleArrayChange(e, index, 'relatedFilms')
											}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('relatedFilms', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('relatedFilms')}
								>
									Add New Film
								</Button>
							</div>

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
