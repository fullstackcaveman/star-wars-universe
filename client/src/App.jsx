import { Route, Routes } from 'react-router-dom';
import CharacterEdit from './components/characters/CharacterEdit';
import CharacterInfo from './components/characters/CharacterInfo';
import CharacterList from './components/characters/CharacterList';
import CharacterPage from './components/characters/CharacterPage';
import FilmEdit from './components/films/FilmEdit';
import FilmInfo from './components/films/FilmInfo';
import FilmList from './components/films/FilmList';
import FilmPage from './components/films/FilmPage';
import Footer from './components/elements/Footer';
import Header from './components/elements/Header';
import HeroSection from './components/elements/HeroSection';
import Home from './components/Home';
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
			<Routes>
				<Route path='/admin/character/:id/edit' element={<CharacterEdit />} />
				<Route path='/admin/characterlist' element={<CharacterList />} />
				<Route path='/admin/film/:id/edit' element={<FilmEdit />} />
				<Route path='/admin/filmlist' element={<FilmList />} />
				<Route path='/admin/planet/:id/edit' element={<PlanetEdit />} />
				<Route path='/admin/planetlist' element={<PlanetList />} />
				<Route path='/admin/species/:id/edit' element={<SpeciesEdit />} />
				<Route path='/admin/specieslist' element={<SpeciesList />} />
				<Route path='/admin/user/:id/edit' element={<UserEdit />} />
				<Route path='/admin/starship/:id/edit' element={<StarshipEdit />} />
				<Route path='/admin/starshiplist' element={<StarshipList />} />
				<Route path='/admin/vehicle/:id/edit' element={<VehicleEdit />} />
				<Route path='/admin/vehiclelist' element={<VehicleList />} />
				<Route path='/admin/userlist' element={<UserList />} />
				<Route
					path='/characters/info/:pretty_url'
					element={<CharacterInfo />}
				/>
				<Route path='/characters/:id' element={<CharacterInfo />} />
				<Route path='/characters' element={<CharacterPage />} />
				<Route path='/films/info/:pretty_url' element={<FilmInfo />} />
				<Route path='/films/:id' element={<FilmInfo />} />
				<Route path='/films' element={<FilmPage />} />
				<Route path='/planets/info/:pretty_url' element={<PlanetInfo />} />
				<Route path='/planets/:id' element={<PlanetInfo />} />
				<Route path='/planets' element={<PlanetPage />} />
				<Route path='/species/info/:pretty_url' element={<SpeciesInfo />} />
				<Route path='/species/:id' element={<SpeciesInfo />} />
				<Route path='/species' element={<SpeciesPage />} />
				<Route path='/starships/info/:pretty_url' element={<StarshipInfo />} />
				<Route path='/starships/:id' element={<StarshipInfo />} />
				<Route path='/starships' element={<StarshipPage />} />
				<Route path='/users/login' element={<UserLoginForm />} />
				<Route path='/users/profile' element={<UserProfile />} />
				<Route path='/users/register' element={<UserRegisterForm />} />
				<Route path='/vehicles/info/:pretty_url' element={<VehicleInfo />} />
				<Route path='/vehicles/:id' element={<VehicleInfo />} />
				<Route path='/vehicles' element={<VehiclePage />} />
				<Route exact path='/' element={<Home />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
