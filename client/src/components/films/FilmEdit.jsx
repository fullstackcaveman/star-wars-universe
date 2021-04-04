import { useState, useEffect } from 'react';
import update from 'immutability-helper';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Avatar,
	Button,
	Grid,
	Paper,
	TextField,
	Typography,
	IconButton,
	TextareaAutosize,
} from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';

import Message from '../elements/Message';
import Loader from '../elements/Loader';
import Background from '../elements/Background';
import { listFilmInfo, updateFilm } from '../../actions/filmActions';
import { FILM_UPDATE_RESET } from '../../constants/filmConstants';

const FilmEdit = ({ match, history }) => {
	const filmId = match.params.id;

	const [filmForm, setFilmForm] = useState({
		title: '',
		pretty_url: '',
		episode_id: '',
		opening_crawl: '',
		director: '',
		release_date: '',
		image: '',
		characters: [],
		producer: [],
		planets: [],
		starships: [],
		vehicles: [],
		species: [],
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
					characters: film.characters,
					producer: film.producer,
					planets: film.planets,
					starships: film.starships,
					vehicles: film.vehicles,
					species: film.species,
				});
			}
		}
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

	// Handle Arrays in form fields -
	const handleArrayChange = (e, index, arr) => {
		setFilmForm(
			update(filmForm, {
				[arr]: {
					[index]: {
						$set: e.target.value,
					},
				},
			})
		);
	};

	const handleAddItem = (arr) => {
		const newArray = filmForm[arr].push('');
		setFilmForm({ ...filmForm, newArray });
	};

	const handleDelete = (arr, index) => {
		console.log(arr, index);
		const newArray = filmForm[arr].filter(
			(item) => item !== filmForm[arr][index]
		);
		setFilmForm({ ...filmForm, [arr]: newArray });
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
								onChange={(e) =>
									setFilmForm({ ...filmForm, name: e.target.value })
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
								value={filmForm.pretty_url}
								onChange={(e) =>
									setFilmForm({
										...filmForm,
										pretty_url: e.target.value,
									})
								}
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
								onChange={(e) =>
									setFilmForm({
										...filmForm,
										episode_id: e.target.value,
									})
								}
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
								onChange={(e) =>
									setFilmForm({
										...filmForm,
										director: e.target.value,
									})
								}
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
								onChange={(e) =>
									setFilmForm({
										...filmForm,
										release_date: e.target.value,
									})
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
								value={filmForm.image}
								onChange={(e) =>
									setFilmForm({
										...filmForm,
										image: e.target.value,
									})
								}
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
								onChange={(e) =>
									setFilmForm({
										...filmForm,
										opening_crawl: e.target.value,
									})
								}
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
								{(filmForm.characters || []).map((_character, index) => (
									<div key={index} className='characters'>
										<TextField
											variant='outlined'
											size='small'
											value={filmForm.characters[index]}
											name='characters'
											onChange={(e) =>
												handleArrayChange(e, index, 'characters')
											}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('characters', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('characters')}
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
								{(filmForm.planets || []).map((_planets, index) => (
									<div key={index} className='planets'>
										<TextField
											variant='outlined'
											size='small'
											value={filmForm.planets[index]}
											name='planets'
											onChange={(e) => handleArrayChange(e, index, 'planets')}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('planets', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('planets')}
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
								{(filmForm.starships || []).map((_starships, index) => (
									<div key={index} className='starships'>
										<TextField
											variant='outlined'
											size='small'
											value={filmForm.starships[index]}
											name='starships'
											onChange={(e) => handleArrayChange(e, index, 'starships')}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('starships', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('starships')}
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
								{(filmForm.vehicles || []).map((_vehicles, index) => (
									<div key={index} className='vehicles'>
										<TextField
											variant='outlined'
											size='small'
											value={filmForm.vehicles[index]}
											name='vehicles'
											onChange={(e) => handleArrayChange(e, index, 'vehicles')}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('vehicles', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('vehicles')}
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
								{(filmForm.species || []).map((_species, index) => (
									<div key={index} className='species'>
										<TextField
											variant='outlined'
											size='small'
											value={filmForm.species[index]}
											name='species'
											onChange={(e) => handleArrayChange(e, index, 'species')}
										/>
										<IconButton
											size='small'
											onClick={() => handleDelete('species', index)}
										>
											<DeleteForever />
										</IconButton>
									</div>
								))}
								<Button
									variant='contained'
									onClick={() => handleAddItem('planets')}
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
