import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
// import { characters } from './data/characters.js';
// import Character from './models/characterModel.js';
// import { films } from './data/films.js';
// import Film from './models/filmModel.js';
// import { planets } from './data/planets.js';
// import Planet from './models/planetModel.js';
// import { species } from './data/species.js';
// import Species from './models/speciesModel.js';
// import { starships } from './data/starships.js';
// import Starship from './models/starshipModel.js';
import { users } from './data/users.js';
import User from './models/userModel.js';
// import { vehicles } from './data/vehicles.js';
// import Vehicle from './models/vehicleModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
	try {
		// await User.deleteMany();
		// await Character.deleteMany();
		// await Film.deleteMany();
		// await Planet.deleteMany();
		// await Species.deleteMany();
		// await Starship.deleteMany();
		// await Vehicle.deleteMany();
		console.log('Characters Deleted');
		// await User.insertMany(users);
		// await Character.insertMany(characters);
		// await Film.insertMany(films);
		// await Planet.insertMany(planets);
		// await Species.insertMany(species);
		// await Starship.insertMany(starships);
		// await Vehicle.insertMany(vehicles);
		console.log('Data Imported!'.green.inverse);
		process.exit();
	} catch (error) {
		console.error(`${error}`.red.inverse);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		// await Character.deleteMany();
		// await Film.deleteMany();
		// await Planet.deleteMany();
		// await Species.deleteMany();
		// await Starship.deleteMany();
		// await Vehicle.deleteMany();
		console.log('Data Destroyed!'.red.inverse);
		process.exit();
	} catch (error) {
		console.error(`${error}`.red.inverse);
		process.exit(1);
	}
};

if (process.argv[2] === '-d') {
	destroyData();
} else {
	importData();
}
