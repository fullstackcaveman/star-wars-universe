import { Switch, Route } from 'react-router-dom';
import CharacterInfo from './components/characters/CharacterInfo';
import CharacterPage from './components/characters/CharacterPage';
import Films from './components/films/Films';
import Footer from './components/Footer';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Home from './components/Home';
import Planets from './components/planets/Planets';
import Species from './components/species/Species';
import Starships from './components/starships/Starships';
import Vehicles from './components/vehicles/Vehicles';

const App = () => {
	return (
		<div className='App'>
			<Header />
			<HeroSection />
			<Switch>
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
