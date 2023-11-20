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
} from '@mui/material';
import { DeleteForever } from '@mui/icons-material';
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
		region: '',
		sector: '',
		system: '',
		distance_from_core: '',
		classification: '',
		atmosphere: '',
		grid_coords: '',
		climate: [],
		gravity: [],
		terrain: [],
		suns: [],
		residents: [],
		relatedFilms: [],
		moons: [],
		trade_routes: [],
		points_of_interest: [],
		flora: [],
		fauna: [],
		native_species: [],
		immigrated_species: [],
		primary_languages: [],
		major_cities: [],
		major_imports: [],
		major_exports: [],
		affiliations: [],
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
					region: planet.region,
					sector: planet.sector,
					system: planet.system,
					distance_from_core: planet.distance_from_core,
					classification: planet.classification,
					atmosphere: planet.atmosphere,
					grid_coords: planet.grid_coords,
					climate: planet.climate,
					gravity: planet.gravity,
					terrain: planet.terrain,
					residents: planet.residents,
					relatedFilms: planet.relatedFilms,
					suns: planet.suns,
					moons: planet.moons,
					trade_routes: planet.trade_routes,
					points_of_interest: planet.points_of_interest,
					flora: planet.flora,
					fauna: planet.fauna,
					native_species: planet.native_species,
					immigrated_species: planet.immigrated_species,
					primary_languages: planet.primary_languages,
					major_cities: planet.major_cities,
					major_imports: planet.major_imports,
					major_exports: planet.major_exports,
					affiliations: planet.affiliations,
				});
			}
		}
		// eslint-disable-next-line
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
								label='Region'
								placeholder='Enter Region'
								variant='outlined'
								size='small'
								fullWidth
								name='region'
								value={planetForm.region}
								onChange={(e) => handleInputChange(e.target)}
							/>

							<TextField
								style={inputStyle}
								label='Sector'
								placeholder='Enter Sector'
								variant='outlined'
								size='small'
								fullWidth
								name='sector'
								value={planetForm.sector}
								onChange={(e) => handleInputChange(e.target)}
							/>

							<TextField
								style={inputStyle}
								label='System'
								placeholder='Enter System'
								variant='outlined'
								size='small'
								fullWidth
								name='system'
								value={planetForm.system}
								onChange={(e) => handleInputChange(e.target)}
							/>

							<TextField
								style={inputStyle}
								label='Rotational Period'
								placeholder='Enter Rotational Period'
								variant='outlined'
								size='small'
								fullWidth
								name='rotation_period'
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
								label='Distance from Core'
								placeholder='Enter Distance from Core'
								variant='outlined'
								size='small'
								fullWidth
								name='distance_from_core'
								value={planetForm.distance_from_core}
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
								value={planetForm.classification}
								onChange={(e) => handleInputChange(e.target)}
							/>

							<TextField
								style={inputStyle}
								label='Atmosphere'
								placeholder='Enter Atmosphere'
								variant='outlined'
								size='small'
								fullWidth
								name='atmosphere'
								value={planetForm.atmosphere}
								onChange={(e) => handleInputChange(e.target)}
							/>

							<TextField
								style={inputStyle}
								label='Grid Coordinates'
								placeholder='Enter Grid Coordinates'
								variant='outlined'
								size='small'
								fullWidth
								name='grid_coords'
								value={planetForm.grid_coords}
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
								className='suns'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Suns:</Typography>
								{(planetForm.suns || []).map((_item, index) => (
									<div key={index} className='suns'>
										<TextField
											variant='outlined'
											size='small'
											value={planetForm.suns[index]}
											name='suns'
											onChange={(e) => handleArrayChange(e, index, 'suns')}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('suns', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('suns')}
								>
									Add New Sun
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
								className='relatedFilms'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Related Films:</Typography>
								{(planetForm.relatedFilms || []).map((_item, index) => (
									<div key={index} className='relatedFilms'>
										<TextField
											variant='outlined'
											size='small'
											value={planetForm.relatedFilms[index]}
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

							<div
								className='moons'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Moons:</Typography>
								{(planetForm.moons || []).map((_item, index) => (
									<div key={index} className='moons'>
										<TextField
											variant='outlined'
											size='small'
											value={planetForm.moons[index]}
											name='moons'
											onChange={(e) => handleArrayChange(e, index, 'moons')}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('moons', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('moons')}
								>
									Add New Moon
								</Button>
							</div>

							<div
								className='trade-routes'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Trade Routes:</Typography>
								{(planetForm.trade_routes || []).map((_item, index) => (
									<div key={index} className='trade_routes'>
										<TextField
											variant='outlined'
											size='small'
											value={planetForm.trade_routes[index]}
											name='trade_routes'
											onChange={(e) =>
												handleArrayChange(e, index, 'trade_routes')
											}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('trade_routes', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('trade_routes')}
								>
									Add New Trade Route
								</Button>
							</div>

							<div
								className='points-of-interest'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Points of Interest:</Typography>
								{(planetForm.points_of_interest || []).map((_item, index) => (
									<div key={index} className='points_of_interest'>
										<TextField
											variant='outlined'
											size='small'
											value={planetForm.points_of_interest[index]}
											name='points_of_interest'
											onChange={(e) =>
												handleArrayChange(e, index, 'points_of_interest')
											}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('points_of_interest', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('points_of_interest')}
								>
									Add New Point of Interest
								</Button>
							</div>

							<div
								className='flora'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Flora:</Typography>
								{(planetForm.flora || []).map((_item, index) => (
									<div key={index} className='flora'>
										<TextField
											variant='outlined'
											size='small'
											value={planetForm.flora[index]}
											name='flora'
											onChange={(e) => handleArrayChange(e, index, 'flora')}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('flora', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('flora')}
								>
									Add New Flora
								</Button>
							</div>

							<div
								className='fauna'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Fauna:</Typography>
								{(planetForm.fauna || []).map((_item, index) => (
									<div key={index} className='fauna'>
										<TextField
											variant='outlined'
											size='small'
											value={planetForm.fauna[index]}
											name='fauna'
											onChange={(e) => handleArrayChange(e, index, 'fauna')}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('fauna', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('fauna')}
								>
									Add New Fauna
								</Button>
							</div>

							<div
								className='native-species'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Native Species:</Typography>
								{(planetForm.native_species || []).map((_item, index) => (
									<div key={index} className='native_species'>
										<TextField
											variant='outlined'
											size='small'
											value={planetForm.native_species[index]}
											name='native_species'
											onChange={(e) =>
												handleArrayChange(e, index, 'native_species')
											}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('native_species', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('native_species')}
								>
									Add New Species
								</Button>
							</div>

							<div
								className='immigrated-species'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Immigrated Species:</Typography>
								{(planetForm.immigrated_species || []).map((_item, index) => (
									<div key={index} className='immigrated_species'>
										<TextField
											variant='outlined'
											size='small'
											value={planetForm.immigrated_species[index]}
											name='immigrated_species'
											onChange={(e) =>
												handleArrayChange(e, index, 'immigrated_species')
											}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('immigrated_species', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('immigrated_species')}
								>
									Add New Species
								</Button>
							</div>

							<div
								className='primary-languages'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Primary Languages:</Typography>
								{(planetForm.primary_languages || []).map((_item, index) => (
									<div key={index} className='primary_languages'>
										<TextField
											variant='outlined'
											size='small'
											value={planetForm.primary_languages[index]}
											name='primary_languages'
											onChange={(e) =>
												handleArrayChange(e, index, 'primary_languages')
											}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('primary_languages', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('primary_languages')}
								>
									Add New Language
								</Button>
							</div>

							<div
								className='major-cities'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Major Cities:</Typography>
								{(planetForm.major_cities || []).map((_item, index) => (
									<div key={index} className='major_cities'>
										<TextField
											variant='outlined'
											size='small'
											value={planetForm.major_cities[index]}
											name='major_cities'
											onChange={(e) =>
												handleArrayChange(e, index, 'major_cities')
											}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('major_cities', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('major_cities')}
								>
									Add New City
								</Button>
							</div>

							<div
								className='major-imports'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Major Imports:</Typography>
								{(planetForm.major_imports || []).map((_item, index) => (
									<div key={index} className='major_imports'>
										<TextField
											variant='outlined'
											size='small'
											value={planetForm.major_imports[index]}
											name='major_imports'
											onChange={(e) =>
												handleArrayChange(e, index, 'major_imports')
											}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('major_imports', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('major_imports')}
								>
									Add New Import
								</Button>
							</div>

							<div
								className='major-exports'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Major Exports:</Typography>
								{(planetForm.major_exports || []).map((_item, index) => (
									<div key={index} className='major_exports'>
										<TextField
											variant='outlined'
											size='small'
											value={planetForm.major_exports[index]}
											name='major_exports'
											onChange={(e) =>
												handleArrayChange(e, index, 'major_exports')
											}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('major_exports', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('major_exports')}
								>
									Add New Export
								</Button>
							</div>

							<div
								className='affiliations'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Affiliations:</Typography>
								{(planetForm.affiliations || []).map((_item, index) => (
									<div key={index} className='affiliations'>
										<TextField
											variant='outlined'
											size='small'
											value={planetForm.affiliations[index]}
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
