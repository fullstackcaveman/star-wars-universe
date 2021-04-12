import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHandleForm } from '../../hooks/useHandleForm';
import {
	Avatar,
	Button,
	Grid,
	Paper,
	TextField,
	Typography,
	IconButton,
} from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';
import Message from '../elements/Message';
import Loader from '../elements/Loader';
import Background from '../elements/Background';
import { listPlanetInfo, updatePlanet } from '../../actions/planetActions';
import { PLANET_UPDATE_RESET } from '../../constants/planetConstants';

const PlanetEdit = ({ match, history }) => {
	const planetId = match.params.id;

	const [
		planetForm,
		setPlanetForm,
		handleInputChange,
		handleArrayChange,
		handleAddItem,
		handleDelete,
	] = useHandleForm({
		name: '',
		pretty_url: '',
		rotation_period: '',
		orbital_period: '',
		diameter: '',
		surface_water: '',
		population: '',
		image: '',
		climate: [],
		gravity: [],
		terrain: [],
		residents: [],
		films: [],
		url: '',
	});

	const dispatch = useDispatch();

	const planetInfo = useSelector((state) => state.planetInfo);
	const { loading, error, planet } = planetInfo;

	const planetUpdate = useSelector((state) => state.planetUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = planetUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PLANET_UPDATE_RESET });
			history.push('/admin/planetlist');
		} else {
			if (!planet.name || planet._id !== planetId) {
				dispatch(listPlanetInfo(planetId));
			} else {
				setPlanetForm({
					name: planet.name,
					pretty_url: planet.pretty_url,
					rotation_period: planet.rotation_period,
					orbital_period: planet.orbital_period,
					diameter: planet.diameter,
					surface_water: planet.surface_water,
					population: planet.population,
					image: planet.image,
					climate: planet.climate,
					gravity: planet.gravity,
					terrain: planet.terrain,
					residents: planet.residents,
					films: planet.films,
					url: planet.url,
				});
			}
		}
	}, [planet, planetId, dispatch, successUpdate, history]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updatePlanet({
				_id: planetId,
				...planetForm,
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
			<Grid className='add-planet'>
				<Paper elevation={10} style={paperStyle}>
					<Grid align='center'>
						<Avatar style={avatarStyle} />
						<Typography variant='h5' id='add-planet-h2'>
							{`Edit ${planet.name}`}
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
								placeholder='Enter Planet Name'
								variant='outlined'
								size='small'
								fullWidth
								name='name'
								value={planetForm.name}
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
								value={planetForm.pretty_url}
								onChange={(e) => handleInputChange(e.target)}
							/>

							<TextField
								style={inputStyle}
								label='Population'
								placeholder='Enter Population'
								variant='outlined'
								size='small'
								fullWidth
								name='population'
								value={planetForm.population}
								onChange={(e) => handleInputChange(e.target)}
							/>

							<TextField
								style={inputStyle}
								label='Rotational Period'
								placeholder='Enter Rotational Period'
								variant='outlined'
								size='small'
								fullWidth
								name='rotational_period'
								value={planetForm.rotation_period}
								onChange={(e) => handleInputChange(e.target)}
							/>

							<TextField
								style={inputStyle}
								label='Orbital Period'
								placeholder='Enter Orbital Period'
								variant='outlined'
								size='small'
								fullWidth
								name='orbital_period'
								value={planetForm.orbital_period}
								onChange={(e) => handleInputChange(e.target)}
							/>

							<TextField
								style={inputStyle}
								label='Diameter'
								placeholder='Enter Diameter'
								variant='outlined'
								size='small'
								fullWidth
								name='diameter'
								value={planetForm.diameter}
								onChange={(e) => handleInputChange(e.target)}
							/>

							<TextField
								style={inputStyle}
								label='Surface Water'
								placeholder='Enter Surface Water'
								variant='outlined'
								size='small'
								fullWidth
								name='surface_water'
								value={planetForm.surface_water}
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
								value={planetForm.image}
								onChange={(e) => handleInputChange(e.target)}
							/>

							<TextField
								style={inputStyle}
								label='URL'
								placeholder='Enter URL'
								variant='outlined'
								size='small'
								fullWidth
								name='url'
								value={planetForm.url}
								onChange={(e) => handleInputChange(e.target)}
							/>

							<div
								className='climate'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Climate:</Typography>
								{(planetForm.climate || []).map((_item, index) => (
									<div key={index} className='climate'>
										<TextField
											variant='outlined'
											size='small'
											value={planetForm.climate[index]}
											name='climate'
											onChange={(e) => handleArrayChange(e, index, 'climate')}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('climate', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('climate')}
								>
									Add New Climate
								</Button>
							</div>

							<div
								className='gravity'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Gravity:</Typography>
								{(planetForm.gravity || []).map((_item, index) => (
									<div key={index} className='gravity'>
										<TextField
											variant='outlined'
											size='small'
											value={planetForm.gravity[index]}
											name='gravity'
											onChange={(e) => handleArrayChange(e, index, 'gravity')}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('gravity', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('gravity')}
								>
									Add New Gravity
								</Button>
							</div>

							<div
								className='terrain'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Terrain:</Typography>
								{(planetForm.terrain || []).map((_item, index) => (
									<div key={index} className='terrain'>
										<TextField
											variant='outlined'
											size='small'
											value={planetForm.terrain[index]}
											name='terrain'
											onChange={(e) => handleArrayChange(e, index, 'terrain')}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('terrain', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('terrain')}
								>
									Add New Terrain
								</Button>
							</div>

							<div
								className='residents'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Residents:</Typography>
								{(planetForm.residents || []).map((_item, index) => (
									<div key={index} className='residents'>
										<TextField
											variant='outlined'
											size='small'
											value={planetForm.residents[index]}
											name='residents'
											onChange={(e) => handleArrayChange(e, index, 'residents')}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('residents', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('residents')}
								>
									Add New Resident
								</Button>
							</div>

							<div
								className='films'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Films:</Typography>
								{(planetForm.films || []).map((_item, index) => (
									<div key={index} className='films'>
										<TextField
											variant='outlined'
											size='small'
											value={planetForm.films[index]}
											name='films'
											onChange={(e) => handleArrayChange(e, index, 'films')}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('films', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('films')}
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
						<Link to='/admin/planetList'>CANCEL</Link>
					</Typography>
				</Paper>
			</Grid>
			<Background />
		</>
	);
};

export default PlanetEdit;
