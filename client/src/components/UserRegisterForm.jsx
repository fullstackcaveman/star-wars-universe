import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Avatar,
	Button,
	Grid,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core';
import Message from './Message';
import Loader from './Loader';
import Background from './Background';
import { register } from '../actions/userActions';

const UserRegisterForm = ({ location, history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else {
			dispatch(register(name, email, password));
		}
	};

	const paperStyle = {
		backgroundColor: 'black',
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

	const newUserBtnStyle = {
		backgroundColor: 'transparent',

		color: '#ffee58',
		fontFamily: 'Impact, sans-serif',
		fontSize: '1rem',
		cursor: 'pointer',
	};

	return (
		<>
			<Grid className='add-user'>
				<Paper elevation={10} style={paperStyle}>
					<Grid align='center'>
						<Avatar style={avatarStyle} />
						<Typography variant='h5' id='add-user-h2'>
							Sign Up
						</Typography>
					</Grid>
					{message && <Message severity='error' message={message} />}
					{error && <Message severity='error' message={error} />}
					{loading && <Loader />}
					<form onSubmit={submitHandler}>
						<TextField
							style={inputStyle}
							label='Name'
							placeholder='Enter User Name'
							variant='outlined'
							size='small'
							fullWidth
							required
							name='name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>

						<TextField
							style={inputStyle}
							label='Email'
							placeholder='Enter User Email'
							variant='outlined'
							size='small'
							fullWidth
							required
							name='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<TextField
							style={inputStyle}
							label='Password'
							placeholder='Enter Password'
							variant='outlined'
							size='small'
							fullWidth
							required
							name='password'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<TextField
							style={inputStyle}
							label='Confirm Password'
							placeholder='Confirm Password'
							variant='outlined'
							size='small'
							fullWidth
							required
							name='confirmPassword'
							type='password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>

						<Button
							style={submitBtnStyle}
							type='submit'
							color='primary'
							variant='contained'
							fullWidth
							// disabled={disabled}
						>
							Register
						</Button>
					</form>
					<Grid align='center'>
						<Link
							to={
								redirect ? `/users/login?redirect=${redirect}` : '/users/login'
							}
							style={newUserBtnStyle}
						>
							Have An Account? Login
						</Link>
					</Grid>
				</Paper>
			</Grid>
			<Background />
		</>
	);
};

export default UserRegisterForm;
