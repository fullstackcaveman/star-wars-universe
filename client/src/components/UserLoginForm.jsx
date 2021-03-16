import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Avatar,
	Button,
	Grid,
	Link,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core';
import Message from './Message';
import Loader from './Loader';
import Background from './Background';
import { login } from '../actions/userActions';

const UserLoginForm = ({ location, history }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (userInfo) {
			history.push(redirect);
		}
	}, [history, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
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
							Sign In
						</Typography>
					</Grid>
					{error && <Message severity='error'>{error}</Message>}
					{loading && <Loader />}
					<form onSubmit={submitHandler}>
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

						<Button
							style={submitBtnStyle}
							type='submit'
							color='primary'
							variant='contained'
							fullWidth
							// disabled={disabled}
						>
							SIGN IN
						</Button>
					</form>
					<Grid align='center'>
						<Link
							to={redirect ? `/register?redirect=${redirect}` : '/register'}
							style={newUserBtnStyle}
						>
							New User?
						</Link>
					</Grid>
				</Paper>
			</Grid>
			<Background />
		</>
	);
};

export default UserLoginForm;
