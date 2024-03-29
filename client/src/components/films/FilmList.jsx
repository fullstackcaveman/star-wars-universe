import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import AddIcon from '@mui/icons-material/Add';
import Message from '../elements/Message';
import Loader from '../elements/Loader';
import Background from '../elements/Background';
import { listFilms, deleteFilm, createFilm } from '../../actions/filmActions';
import { FILM_CREATE_RESET } from '../../constants/filmConstants';

const FilmList = () => {
	document.title = 'Star Wars | Film List';
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const filmList = useSelector((state) => state.filmList);
	const { loading, error, films } = filmList;

	const filmDelete = useSelector((state) => state.filmDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = filmDelete;

	const filmCreate = useSelector((state) => state.filmCreate);
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		film: createdFilm,
	} = filmCreate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		dispatch({ type: FILM_CREATE_RESET });

		if (!userInfo.isAdmin) {
			navigate('/users/login');
		}

		if (successCreate) {
			navigate(`/admin/film/${createdFilm._id}/edit`);
		} else {
			dispatch(listFilms());
		}
	}, [dispatch, navigate, userInfo, successDelete, successCreate, createdFilm]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteFilm(id));
		}
	};

	const createFilmHandler = () => {
		dispatch(createFilm());
	};

	return (
		<div className='edit-table'>
			<Button
				style={{ marginBottom: '10px' }}
				variant='contained'
				color='primary'
				onClick={createFilmHandler}
			>
				<AddIcon /> Create Film
			</Button>

			{loadingDelete && <Loader />}
			{errorDelete && <Message severity='error' message={errorDelete} />}
			{loadingCreate && <Loader />}
			{errorCreate && <Message severity='error' message={errorCreate} />}
			{loading ? (
				<Loader />
			) : error ? (
				<Message severity='error' message={error} />
			) : (
				<TableContainer component={Paper}>
					<Table size='small'>
						<TableHead>
							<TableRow>
								<TableCell align='center'>TITLE</TableCell>
								<TableCell align='center'>RELEASE DATE</TableCell>
								<TableCell align='center'>DIRECTOR</TableCell>
								<TableCell align='center'></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{films.map((film) => {
								return (
									<TableRow key={film._id}>
										<TableCell align='center'>{film.title}</TableCell>
										<TableCell align='center'>{film.release_date}</TableCell>
										<TableCell align='center'>{film.director}</TableCell>
										<TableCell align='center'>
											<NavLink to={`/films/info/${film.pretty_url}`}>
												<Button variant='contained' size='small'>
													<OpenInBrowserIcon />
												</Button>
											</NavLink>
											<NavLink to={`/admin/film/${film._id}/edit`}>
												<Button
													variant='contained'
													size='small'
													color='primary'
												>
													<EditIcon />
												</Button>
											</NavLink>
											<Button
												variant='contained'
												color='secondary'
												size='small'
												onClick={() => deleteHandler(film._id)}
											>
												<DeleteForeverIcon />
											</Button>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			)}
			<Background />
		</div>
	);
};

export default FilmList;
