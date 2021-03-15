import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<header id='header' className='header'>
			<div className='header-left'>{/* <h1>HEADER</h1> */}</div>
			<div className='nav-btn'>
				<Link to='/'>
					<button>Home</button>
				</Link>
				<Link to='/users/login'>
					<button>Login</button>
				</Link>
			</div>
		</header>
	);
};

export default Header;
