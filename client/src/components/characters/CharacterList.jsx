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
import AddIcon from '@mui/icons-material/Add';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import Message from '../elements/Message';
import Loader from '../elements/Loader';
import Background from '../elements/Background';
import {
	listCharacters,
	deleteCharacter,
	createCharacter,
} from '../../actions/characterActions';
import { CHARACTER_CREATE_RESET } from '../../constants/characterConstants';

const CharacterList = ({ history, match }) => {
	document.title = 'Star Wars | Character List';
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const characterList = useSelector((state) => state.characterList);
	const { loading, error, characters } = characterList;

	const characterDelete = useSelector((state) => state.characterDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = characterDelete;

	const characterCreate = useSelector((state) => state.characterCreate);
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		character: createdCharacter,
	} = characterCreate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		dispatch({ type: CHARACTER_CREATE_RESET });

		if (!userInfo.isAdmin) {
			navigate('/users/login');
		}

		if (successCreate) {
			navigate(`/admin/character/${createdCharacter._id}/edit`);
		} else {
			dispatch(listCharacters());
		}
	}, [
		dispatch,
		navigate,
		userInfo,
		successDelete,
		successCreate,
		createdCharacter,
	]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteCharacter(id));
		}
	};

	const createCharacterHandler = () => {
		dispatch(createCharacter());
	};

	return (
		<div className='edit-table'>
			<Button
				style={{ marginBottom: '10px' }}
				variant='contained'
				color='primary'
				onClick={createCharacterHandler}
			>
				<AddIcon /> Create Character
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
								<TableCell align='center'>NAME</TableCell>
								<TableCell align='center'>SPECIES</TableCell>
								<TableCell align='center'>HOMEWORLD</TableCell>
								<TableCell align='center'></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{characters.map((character) => {
								return (
									<TableRow key={character._id}>
										<TableCell align='center'>{character.name}</TableCell>
										<TableCell align='center'>{character.species}</TableCell>
										<TableCell align='center'>
											{character.homeworld.map((world) => (
												<p key={world}>{world}</p>
											))}
										</TableCell>
										<TableCell align='center'>
											<NavLink to={`/characters/info/${character.pretty_url}`}>
												<Button variant='contained' size='small'>
													<OpenInBrowserIcon />
												</Button>
											</NavLink>

											<NavLink to={`/admin/character/${character._id}/edit`}>
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
												onClick={() => deleteHandler(character._id)}
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

export default CharacterList;
