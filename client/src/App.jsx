import { Switch, Route } from 'react-router-dom';
import CharacterInfo from './components/characters/CharacterInfo';
import CharacterList from './components/characters/CharacterList';
import CharacterPage from './components/characters/CharacterPage';
import Films from './components/films/Films';
import Footer from './components/elements/Footer';
import Header from './components/elements/Header';
import HeroSection from './components/elements/HeroSection';
import Home from './components/Home';
import Planets from './components/planets/Planets';
import Species from './components/species/Species';
import Starships from './components/starships/Starships';
import UserLoginForm from './components/forms/UserLoginForm';
import UserList from './components/users/UserList';
import UserProfile from './components/forms/UserProfile';
import UserRegisterForm from './components/forms/UserRegisterForm';
import Vehicles from './components/vehicles/Vehicles';
import UserEdit from './components/users/UserEdit';

const App = () => {
	return (
		<div className='App'>
			<Header />
			<HeroSection />
			<Switch>
				<Route path='/admin/characterList' component={CharacterList} />
				<Route path='/admin/user/:id/edit' component={UserEdit} />
				<Route path='/admin/userlist' component={UserList} />
				<Route path='/users/login' component={UserLoginForm} />
				<Route path='/users/profile' component={UserProfile} />
				<Route path='/users/register' component={UserRegisterForm} />
				<Route exact path='/characters' component={CharacterPage} />
				<Route path='/characters/:id' component={CharacterInfo} />
				<Route exact path='/films' component={Films} />
				<Route path='/planets' component={Planets} />
				<Route exact path='/species' component={Species} />
				<Route path='/starships' component={Starships} />
				<Route exact path='/vehicles' component={Vehicles} />
				<Route exact path='/' component={Home} />
			</Switch>
			<Footer />
		</div>
	);
};

export default App;
