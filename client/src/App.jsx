import { Switch, Route } from 'react-router-dom';
import CharacterEdit from './components/characters/CharacterEdit';
import CharacterInfo from './components/characters/CharacterInfo';
import CharacterList from './components/characters/CharacterList';
import CharacterPage from './components/characters/CharacterPage';
import Footer from './components/elements/Footer';
import Header from './components/elements/Header';
import HeroSection from './components/elements/HeroSection';
import Home from './components/Home';
import FilmPage from './components/films/FilmPage';
import PlanetPage from './components/planets/PlanetPage';
import PlanetInfo from './components/planets/PlanetInfo';
import PlanetList from './components/planets/PlanetList';
import PlanetEdit from './components/planets/PlanetEdit';
import SpeciesList from './components/species/SpeciesList';
import SpeciesEdit from './components/species/SpeciesEdit';
import SpeciesPage from './components/species/SpeciesPage';
import Starships from './components/starships/Starships';
import UserEdit from './components/users/UserEdit';
import UserLoginForm from './components/forms/UserLoginForm';
import UserList from './components/users/UserList';
import UserProfile from './components/forms/UserProfile';
import UserRegisterForm from './components/forms/UserRegisterForm';
import Vehicles from './components/vehicles/Vehicles';
import SpeciesInfo from './components/species/SpeciesInfo';

const App = () => {
	return (
		<div className='App'>
			<Header />
			<HeroSection />
			<Switch>
				<Route path='/admin/character/:id/edit' component={CharacterEdit} />
				<Route path='/admin/characterlist' component={CharacterList} />
				<Route path='/admin/planet/:id/edit' component={PlanetEdit} />
				<Route path='/admin/planetlist' component={PlanetList} />
				<Route path='/admin/species/:id/edit' component={SpeciesEdit} />
				<Route path='/admin/specieslist' component={SpeciesList} />
				<Route path='/admin/user/:id/edit' component={UserEdit} />
				<Route path='/admin/userlist' component={UserList} />
				<Route exact path='/characters' component={CharacterPage} />
				<Route path='/characters/:id' component={CharacterInfo} />
				<Route exact path='/films' component={FilmPage} />
				<Route exact path='/planets' component={PlanetPage} />
				<Route path='/planets/:id' component={PlanetInfo} />
				<Route exact path='/species' component={SpeciesPage} />
				<Route path='/species/:id' component={SpeciesInfo} />
				{/* <Route path='/starships' component={StarshipsPage} /> */}
				<Route path='/users/login' component={UserLoginForm} />
				<Route path='/users/profile' component={UserProfile} />
				<Route path='/users/register' component={UserRegisterForm} />
				{/* <Route exact path='/vehicles' component={VehiclesPage} /> */}
				<Route exact path='/' component={Home} />
			</Switch>
			<Footer />
		</div>
	);
};

export default App;
