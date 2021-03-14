import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import { characters } from './data/characters.js';
import Character from './models/characterModel.js';
import connectDB from './config/db.js';
import { debug } from 'node:console';

dotenv.config();

connectDB();

const importData = async () => {
	try {
		await Character.deleteMany();
		console.log('Characters Deleted');
		await Character.insertMany(characters);
		console.log('Data Imported!'.green.inverse);
		process.exit();
	} catch (error) {
		console.error(`${error}`.red.inverse);
		process.exit(1);
	}
};

const destroyData = async () => {
	try {
		await Character.deleteMany();
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
