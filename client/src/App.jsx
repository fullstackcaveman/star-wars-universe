import { Switch, Route } from 'react-router-dom';
import CharacterEdit from './components/characters/CharacterEdit';
import CharacterInfo from './components/characters/CharacterInfo';
import CharacterList from './components/characters/CharacterList';
import CharacterPage from './components/characters/CharacterPage';
import Footer from './components/elements/Footer';
import Header from './components/elements/Header';
import HeroSection from './components/elements/HeroSection';
import Home from './components/Home';
import FilmEdit from './components/films/FilmEdit';
import FilmInfo from './components/films/FilmInfo';
import FilmList from './components/films/FilmList';
import FilmPage from './components/films/FilmPage';
import PlanetEdit from './components/planets/PlanetEdit';
import PlanetInfo from './components/planets/PlanetInfo';
import PlanetList from './components/planets/PlanetList';
import PlanetPage from './components/planets/PlanetPage';
import SpeciesEdit from './components/species/SpeciesEdit';
import SpeciesInfo from './components/species/SpeciesInfo';
import SpeciesList from './components/species/SpeciesList';
import SpeciesPage from './components/species/SpeciesPage';
import StarshipEdit from './components/starships/StarshipEdit';
import StarshipInfo from './components/starships/StarshipInfo';
import StarshipList from './components/starships/StarshipList';
import StarshipPage from './components/starships/StarshipPage';
import UserEdit from './components/users/UserEdit';
import UserList from './components/users/UserList';
import UserLoginForm from './components/forms/UserLoginForm';
import UserProfile from './components/forms/UserProfile';
import UserRegisterForm from './components/forms/UserRegisterForm';
import VehicleInfo from './components/vehicles/VehicleInfo';
import VehiclePage from './components/vehicles/VehiclePage';
import VehicleEdit from './components/vehicles/VehicleEdit';
import VehicleList from './components/vehicles/VehicleList';

const App = () => {
	return (
		<div className='App'>
			<Header />
			<HeroSection />
			<Switch>
				<Route path='/admin/character/:id/edit' component={CharacterEdit} />
				<Route path='/admin/characterlist' component={CharacterList} />
				<Route path='/admin/film/:id/edit' component={FilmEdit} />
				<Route path='/admin/filmlist' component={FilmList} />
				<Route path='/admin/planet/:id/edit' component={PlanetEdit} />
				<Route path='/admin/planetlist' component={PlanetList} />
				<Route path='/admin/species/:id/edit' component={SpeciesEdit} />
				<Route path='/admin/specieslist' component={SpeciesList} />
				<Route path='/admin/user/:id/edit' component={UserEdit} />
				<Route path='/admin/starship/:id/edit' component={StarshipEdit} />
				<Route path='/admin/starshiplist' component={StarshipList} />
				<Route path='/admin/vehicle/:id/edit' component={VehicleEdit} />
				<Route path='/admin/vehiclelist' component={VehicleList} />
				<Route path='/admin/userlist' component={UserList} />
				<Route path='/characters/info/:pretty_url' component={CharacterInfo} />
				<Route path='/characters/:id' component={CharacterInfo} />
				<Route path='/characters' component={CharacterPage} />
				<Route path='/films/info/:pretty_url' component={FilmInfo} />
				<Route path='/films/:id' component={FilmInfo} />
				<Route path='/films' component={FilmPage} />
				<Route path='/planets/info/:pretty_url' component={PlanetInfo} />
				<Route path='/planets/:id' component={PlanetInfo} />
				<Route path='/planets' component={PlanetPage} />
				<Route path='/species/info/:pretty_url' component={SpeciesInfo} />
				<Route path='/species/:id' component={SpeciesInfo} />
				<Route path='/species' component={SpeciesPage} />
				<Route path='/starships/info/:pretty_url' component={StarshipInfo} />
				<Route path='/starships/:id' component={StarshipInfo} />
				<Route path='/starships' component={StarshipPage} />
				<Route path='/users/login' component={UserLoginForm} />
				<Route path='/users/profile' component={UserProfile} />
				<Route path='/users/register' component={UserRegisterForm} />
				<Route path='/vehicles/info/:pretty_url' component={VehicleInfo} />
				<Route path='/vehicles/:id' component={VehicleInfo} />
				<Route path='/vehicles' component={VehiclePage} />
				<Route exact path='/' component={Home} />
			</Switch>
			<Footer />
		</div>
	);
};

export default App;
