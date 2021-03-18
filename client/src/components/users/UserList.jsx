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
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Message from '../elements/Message';
import Loader from '../elements/Loader';
import Background from '../elements/Background';
import { listUsers } from '../../actions/userActions';

const UserList = ({ history }) => {
	const dispatch = useDispatch();

	const userList = useSelector((state) => state.userList);
	const { loading, error, users } = userList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers());
		} else {
			history.push('/users/login');
		}
	}, [dispatch, history, userInfo]);

	const deleteHandler = (id) => {
		console.log(id);
	};

	return (
		<>
			<h2>Users</h2>
			{loading ? (
				<Loader />
			) : error ? (
				<Message severity='error' message={error} />
			) : (
				<TableContainer component={Paper}>
					<Table size='small'>
						<TableHead>
							<TableRow>
								<TableCell>ID</TableCell>
								<TableCell>NAME</TableCell>
								<TableCell>EMAIL</TableCell>
								<TableCell>ADMIN</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users.map((user) => {
								return (
									<TableRow key={user._id}>
										<TableCell>{user._id}</TableCell>
										<TableCell>{user.name}</TableCell>
										<TableCell>
											<a href={`mailto:${user.email}`}>{user.email}</a>
										</TableCell>
										<TableCell>
											{user.isAdmin ? <CheckIcon /> : <ClearIcon />}
										</TableCell>
										<TableCell>{user._id}</TableCell>
										<TableCell>
											<NavLink to={`/user/${user._id}/edit`}>
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
												onClick={() => deleteHandler(user._id)}
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

export default UserList;
