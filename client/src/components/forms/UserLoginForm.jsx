import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Grid, Paper, Typography } from '@material-ui/core';
import Message from '../elements/Message';
import Loader from '../elements/Loader';
import Background from '../elements/Background';
import { login } from '../../actions/userActions';
import { InputBuilder } from './FormBuilder';
import { useHandleForm } from '../../hooks/useHandleForm';

const UserLoginForm = ({ location, history }) => {
	// eslint-disable-next-line
	const [signInForm, setSignInForm, handleChange] = useHandleForm({
		email: '',
		password: '',
	});

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
		dispatch(login(signInForm.email, signInForm.password));
	};

	const paperStyle = {
		padding: 20,
		height: 'auto',
		width: 250,
		margin: '20px auto',
	};

	const avatarStyle = { backgroundColor: '#ffee58', marginBottom: 10 };

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

		color: 'grey',
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
					{error && <Message severity='error' message={error} />}
					{loading && <Loader />}
					<form onSubmit={submitHandler}>
						<InputBuilder
							field='Email'
							type='email'
							required='required'
							value={signInForm.email}
							setInput={handleChange}
						/>

						<InputBuilder
							field='Password'
							type='password'
							required='required'
							value={signInForm.password}
							setInput={handleChange}
						/>

						<Button
							style={submitBtnStyle}
							type='submit'
							color='primary'
							variant='contained'
							fullWidth
						>
							SIGN IN
						</Button>
					</form>
					<Grid align='center'>
						<Link
							to={
								redirect
									? `/users/register?redirect=${redirect}`
									: '/users/register'
							}
							style={newUserBtnStyle}
						>
							New User? Register
						</Link>
					</Grid>
				</Paper>
			</Grid>
			<Background />
		</>
	);
};

export default UserLoginForm;
