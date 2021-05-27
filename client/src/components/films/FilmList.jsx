import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import AddIcon from '@material-ui/icons/Add';
import Message from '../elements/Message';
import Loader from '../elements/Loader';
import Background from '../elements/Background';
import { listFilms, deleteFilm, createFilm } from '../../actions/filmActions';
import { FILM_CREATE_RESET } from '../../constants/filmConstants';

const FilmList = ({ history, match }) => {
	document.title = 'Star Wars | Film List';
	const dispatch = useDispatch();

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
			history.push('/users/login');
		}

		if (successCreate) {
			history.push(`/admin/film/${createdFilm._id}/edit`);
		} else {
			dispatch(listFilms());
		}
	}, [dispatch, history, userInfo, successDelete, successCreate, createdFilm]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteFilm(id));
		}
	};

	const createFilmHandler = () => {
		dispatch(createFilm());
	};

	return (
		<>
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
		</>
	);
};

export default FilmList;
