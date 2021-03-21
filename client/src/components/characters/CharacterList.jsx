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
import AddIcon from '@material-ui/icons/Add';
import Message from '../elements/Message';
import Loader from '../elements/Loader';
import Background from '../elements/Background';
import {
	listCharacters,
	deleteCharacter,
} from '../../actions/characterActions';

const CharacterList = ({ history, match }) => {
	const dispatch = useDispatch();

	const characterList = useSelector((state) => state.characterList);
	const { loading, error, characters } = characterList;

	const characterDelete = useSelector((state) => state.characterDelete);
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = characterDelete;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listCharacters());
		} else {
			history.push('/users/login');
		}
	}, [dispatch, history, userInfo, successDelete]);

	const deleteHandler = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(deleteCharacter(id));
		}
	};

	const createCharacterHandler = (character) => [
		// Create Character
	];

	return (
		<>
			<Button
				style={{ marginBottom: '10px' }}
				variant='contained'
				color='primary'
				onClick={createCharacterHandler}
			>
				<AddIcon /> Create Character
			</Button>

			{loadingDelete && <Loader />}
			{errorDelete && <Message severity='error' message={error} />}
			{loading ? (
				<Loader />
			) : error ? (
				<Message severity='error' message={error} />
			) : (
				<TableContainer component={Paper}>
					<Table size='small'>
						<TableHead>
							<TableRow>
								{/* <TableCell align='center'>ID</TableCell> */}
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
										{/* <TableCell align='center'>{character._id}</TableCell> */}
										<TableCell align='center'>{character.name}</TableCell>
										<TableCell align='center'>{character.species}</TableCell>
										<TableCell align='center'>{character.homeworld}</TableCell>
										<TableCell align='center'>
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
		</>
	);
};

export default CharacterList;
