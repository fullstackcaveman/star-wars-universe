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
import TextareaAutosize from '@mui/material/TextareaAutosize';
import DeleteForever from '@mui/icons-material/DeleteForever';
import Message from '../elements/Message';
import Loader from '../elements/Loader';
import Background from '../elements/Background';
import { listFilmInfo, updateFilm } from '../../actions/filmActions';
import { FILM_UPDATE_RESET } from '../../constants/filmConstants';

const FilmEdit = ({ match, history }) => {
	const filmId = match.params.id;

	const [
		filmForm,
		setFilmForm,
		handleInputChange,
		handleArrayChange,
		handleAddItem,
		handleDelete,
	] = useHandleForm({
		title: '',
		pretty_url: '',
		episode_id: '',
		opening_crawl: '',
		director: '',
		release_date: '',
		image: '',
		producer: [],
		relatedCharacters: [],
		relatedPlanets: [],
		relatedStarships: [],
		relatedVehicles: [],
		relatedSpecies: [],
	});

	const dispatch = useDispatch();

	const filmInfo = useSelector((state) => state.filmInfo);
	const { loading, error, film } = filmInfo;

	const filmUpdate = useSelector((state) => state.filmUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = filmUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: FILM_UPDATE_RESET });
			history.push('/admin/filmlist');
		} else {
			if (!film.title || film._id !== filmId) {
				dispatch(listFilmInfo(filmId));
			} else {
				setFilmForm({
					title: film.title,
					pretty_url: film.pretty_url,
					episode_id: film.episode_id,
					opening_crawl: film.opening_crawl,
					director: film.director,
					release_date: film.release_date,
					image: film.image,
					producer: film.producer,
					relatedCharacters: film.relatedCharacters,
					relatedPlanets: film.relatedPlanets,
					relatedStarships: film.relatedStarships,
					relatedVehicles: film.relatedVehicles,
					relatedSpecies: film.relatedSpecies,
				});
			}
		}
		// eslint-disable-next-line
	}, [film, filmId, dispatch, successUpdate, history]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			updateFilm({
				_id: filmId,
				...filmForm,
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

	const textAreaStyle = {
		margin: '5px auto',
		border: '1px solid lightgrey',
		borderRadius: '3px',
		fontFamily: 'Roboto, sans-serif',
		fontSize: '1rem',
		color: 'grey',
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
							{`Edit ${film.title}`}
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
								label='Title'
								placeholder='Enter User Title'
								variant='outlined'
								size='small'
								fullWidth
								name='title'
								value={filmForm.title}
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
								value={filmForm.pretty_url}
								onChange={(e) => handleInputChange(e.target)}
							/>

							<TextField
								style={inputStyle}
								label='Episode'
								placeholder='Enter Episode'
								variant='outlined'
								size='small'
								fullWidth
								name='episode_id'
								value={filmForm.episode_id}
								onChange={(e) => handleInputChange(e.target)}
							/>

							<TextField
								style={inputStyle}
								label='Director'
								placeholder='Enter Director'
								variant='outlined'
								size='small'
								fullWidth
								name='director'
								value={filmForm.director}
								onChange={(e) => handleInputChange(e.target)}
							/>

							<TextField
								style={inputStyle}
								label='Release Date'
								placeholder='Enter Release Date'
								variant='outlined'
								size='small'
								fullWidth
								name='release_date'
								value={filmForm.release_date}
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
								value={filmForm.image}
								onChange={(e) => handleInputChange(e.target)}
							/>

							<TextareaAutosize
								style={textAreaStyle}
								rowsMax='20'
								label='Opening Crawl'
								placeholder='Enter Opening Crawl'
								variant='outlined'
								size='small'
								name='opening_crawl'
								value={filmForm.opening_crawl}
								onChange={(e) => handleInputChange(e.target)}
							/>

							<div
								className='characters'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Characters:</Typography>
								{(filmForm.relatedCharacters || []).map((_character, index) => (
									<div key={index} className='characters'>
										<TextField
											variant='outlined'
											size='small'
											value={filmForm.relatedCharacters[index]}
											name='relatedCharacters'
											onChange={(e) =>
												handleArrayChange(e, index, 'relatedCharacters')
											}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('relatedCharacters', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('relatedCharacters')}
								>
									Add New Character
								</Button>
							</div>

							<div
								className='producer'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Producer(s):</Typography>
								{(filmForm.producer || []).map((_producer, index) => (
									<div key={index} className='producer'>
										<TextField
											variant='outlined'
											size='small'
											value={filmForm.producer[index]}
											name='producer'
											onChange={(e) => handleArrayChange(e, index, 'producer')}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('producer', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('producer')}
								>
									Add New Producer
								</Button>
							</div>

							<div
								className='planets'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Planets:</Typography>
								{(filmForm.relatedPlanets || []).map((_planets, index) => (
									<div key={index} className='planets'>
										<TextField
											variant='outlined'
											size='small'
											value={filmForm.relatedPlanets[index]}
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

							<div
								className='starships'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Starships:</Typography>
								{(filmForm.relatedStarships || []).map((_starships, index) => (
									<div key={index} className='starships'>
										<TextField
											variant='outlined'
											size='small'
											value={filmForm.relatedStarships[index]}
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

							<div
								className='vehicles'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Vehicles:</Typography>
								{(filmForm.relatedVehicles || []).map((_vehicles, index) => (
									<div key={index} className='vehicles'>
										<TextField
											variant='outlined'
											size='small'
											value={filmForm.relatedVehicles[index]}
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

							<div
								className='species'
								style={{
									border: '1px solid #bdbdbd',
									borderRadius: '5px',
									padding: '5px 0',
									margin: '5px 0',
								}}
							>
								<Typography variant='body1'>Species:</Typography>
								{(filmForm.relatedSpecies || []).map((_species, index) => (
									<div key={index} className='species'>
										<TextField
											variant='outlined'
											size='small'
											value={filmForm.relatedSpecies[index]}
											name='relatedSpecies'
											onChange={(e) =>
												handleArrayChange(e, index, 'relatedSpecies')
											}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('relatedSpecies', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('relatedSpecies')}
								>
									Add New Species
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
						<Link to='/admin/filmList'>CANCEL</Link>
					</Typography>
				</Paper>
			</Grid>
			<Background />
		</>
	);
};

export default FilmEdit;
