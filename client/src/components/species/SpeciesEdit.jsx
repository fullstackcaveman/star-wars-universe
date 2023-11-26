import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHandleForm } from '../../hooks/useHandleForm';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteForever from '@mui/icons-material/DeleteForever';
import Message from '../elements/Message';
import Loader from '../elements/Loader';
import Background from '../elements/Background';
import { listSpeciesInfo, updateSpecies } from '../../actions/speciesActions';
import { SPECIES_UPDATE_RESET } from '../../constants/speciesConstants';

const SpeciesEdit = ({ match, history }) => {
	const speciesId = id;

	const [
		speciesForm,
		setSpeciesForm,
		handleInputChange,
		handleArrayChange,
		handleAddItem,
		handleDelete,
	] = useHandleForm({
		name: '',
		pretty_url: '',
		image: '',
		classification: '',
		designation: '',
		average_height: '',
		average_lifespan: '',
		homeworld: '',
		language: '',
		skin_colors: [],
		hair_colors: [],
		eye_colors: [],
		people: [],
		relatedFilms: [],
	});

	const dispatch = useDispatch();

	const speciesInfo = useSelector((state) => state.speciesInfo);
	const { loading, error, species } = speciesInfo;

	const speciesUpdate = useSelector((state) => state.speciesUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = speciesUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: SPECIES_UPDATE_RESET });
			history.push('/admin/specieslist');
		} else {
			if (!species.name || species._id !== speciesId) {
				dispatch(listSpeciesInfo(speciesId));
			} else {
				setSpeciesForm({
					name: species.name,
					pretty_url: species.pretty_url,
					image: species.image,
					classification: species.classification,
					designation: species.designation,
					average_height: species.average_height,
					average_lifespan: species.average_lifespan,
					homeworld: species.homeworld,
					language: species.language,
					skin_colors: species.skin_colors,
					hair_colors: species.hair_colors,
					eye_colors: species.eye_colors,
					people: species.people,
					relatedFilms: species.relatedFilms,
				});
			}
		}
		// eslint-disable-next-line
	}, [species, speciesId, dispatch, successUpdate, history]);

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(
			updateSpecies({
				_id: speciesId,
				...speciesForm,
			})
		);
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

	return (
		<>
			<Grid className='add-user'>
				<Paper elevation={10} style={paperStyle}>
					<Grid align='center'>
						<Avatar style={avatarStyle} />
						<Typography variant='h5' id='add-user-h2'>
							{`Edit ${species.name}`}
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
								placeholder='Enter Species Name'
								variant='outlined'
								size='small'
								fullWidth
								name='name'
								value={speciesForm.name}
								onChange={(e) => handleInputChange(e.target)}
							/>

							<TextField
								style={inputStyle}
								label='Pretty URL'
								placeholder='Enter Pretty URL'
								variant='outlined'
								size='small'
								fullWidth
								name='pretty_url'
								value={speciesForm.pretty_url}
								onChange={(e) => handleInputChange(e.target)}
							/>

							<TextField
								style={inputStyle}
								label='Image'
								placeholder='Enter Image'
								variant='outlined'
								size='small'
								fullWidth
								name='image'
								value={speciesForm.image}
								onChange={(e) => handleInputChange(e.target)}
							/>

							<TextField
								style={inputStyle}
								label='Classification'
								placeholder='Enter Classification'
								variant='outlined'
								size='small'
								fullWidth
								name='classification'
								value={speciesForm.classification}
								onChange={(e) => handleInputChange(e.target)}
							/>

							<TextField
								style={inputStyle}
								label='Designation'
								placeholder='Enter Designation'
								variant='outlined'
								size='small'
								fullWidth
								name='designation'
								value={speciesForm.designation}
								onChange={(e) => handleInputChange(e.target)}
							/>

							<TextField
								style={inputStyle}
								label='Average Height'
								placeholder='Enter Average Height'
								variant='outlined'
								size='small'
								fullWidth
								name='average_height'
								value={speciesForm.average_height}
								onChange={(e) => handleInputChange(e.target)}
							/>

							<TextField
								style={inputStyle}
								label='Average Lifespan'
								placeholder='Enter Average Lifespan'
								variant='outlined'
								size='small'
								fullWidth
								name='average_lifespan'
								value={speciesForm.average_lifespan}
								onChange={(e) => handleInputChange(e.target)}
							/>

							<TextField
								style={inputStyle}
								label='Homeworld'
								placeholder='Enter Homeworld'
								variant='outlined'
								size='small'
								fullWidth
								name='homeworld'
								value={speciesForm.homeworld}
								onChange={(e) => handleInputChange(e.target)}
							/>

							<TextField
								style={inputStyle}
								label='Language'
								placeholder='Enter Language'
								variant='outlined'
								size='small'
								fullWidth
								name='language'
								value={speciesForm.language}
								onChange={(e) => handleInputChange(e.target)}
							/>

							<div
								className='skin'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Skin Colors:</Typography>
								{(speciesForm.skin_colors || []).map((_skin, index) => (
									<div key={index} className='skin-colors'>
										<TextField
											variant='outlined'
											size='small'
											value={speciesForm.skin_colors[index]}
											name='skin_colors'
											onChange={(e) =>
												handleArrayChange(e, index, 'skin_colors')
											}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('skin_colors', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('skin_colors')}
								>
									Add New Skin Color
								</Button>
							</div>

							<div
								className='hair'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Hair Colors:</Typography>
								{(speciesForm.hair_colors || []).map((_hair, index) => (
									<div key={index} className='hair-colors'>
										<TextField
											variant='outlined'
											size='small'
											value={speciesForm.hair_colors[index]}
											name='hair_colors'
											onChange={(e) =>
												handleArrayChange(e, index, 'hair_colors')
											}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('hair_colors', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('hair_colors')}
								>
									Add New Hair Color
								</Button>
							</div>

							<div
								className='eyes'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Eye Colors:</Typography>
								{(speciesForm.eye_colors || []).map((_eye, index) => (
									<div key={index} className='eye-colors'>
										<TextField
											variant='outlined'
											size='small'
											value={speciesForm.eye_colors[index]}
											name='eye_colors'
											onChange={(e) =>
												handleArrayChange(e, index, 'eye_colors')
											}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('eye_colors', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('eye_colors')}
								>
									Add New Eye Color
								</Button>
							</div>

							<div
								className='people'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Related People:</Typography>
								{(speciesForm.people || []).map((_eye, index) => (
									<div key={index} className='eye-colors'>
										<TextField
											variant='outlined'
											size='small'
											value={speciesForm.people[index]}
											name='people'
											onChange={(e) => handleArrayChange(e, index, 'people')}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('people', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('people')}
								>
									Add New People
								</Button>
							</div>

							<div
								className='relatedFilms'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Related Films:</Typography>
								{(speciesForm.relatedFilms || []).map(
									(_relatedFilms, index) => (
										<div key={index} className='eye-colors'>
											<TextField
												variant='outlined'
												size='small'
												value={speciesForm.relatedFilms[index]}
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
									)
								)}
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
						<Link to='/admin/speciesList'>CANCEL</Link>
					</Typography>
				</Paper>
			</Grid>
			<Background />
		</>
	);
};

export default SpeciesEdit;
