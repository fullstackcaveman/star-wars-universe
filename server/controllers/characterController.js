import asyncHandler from 'express-async-handler';
import Character from '../models/characterModel.js';

// @desc   Fetch all characters
// @route  GET /api/characters
// @access Public
const getCharacters = asyncHandler(async (req, res) => {
	const characters = await Character.find({});

	res.json(characters);
});

// @desc   Fetch single character
// @route  GET /api/characters/:id
// @access Public
const getCharacterById = asyncHandler(async (req, res) => {
	const character = await Character.findById(req.params.id);

	if (character) {
		res.json(character);
	} else {
		res.status(404);
		throw new Error('Character not found');
	}
});

// @desc   Delete character
// @route  DELETE /api/characters/:id
// @access Private/Admin
const deleteCharacter = asyncHandler(async (req, res) => {
	const character = await Character.findById(req.params.id);

	if (character) {
		await character.remove();
		res.json({ message: 'Character Removed' });
	} else {
		res.status(404);
		throw new Error('Character not found');
	}
});

// @desc   Create a character
// @route  Post /api/characters
// @access Private/Admin
const createCharacter = asyncHandler(async (req, res) => {
	const character = new Character({
		name: 'unknown',
		pretty_url: 'unknown',
		height: 'unknown',
		mass: 'unknown',
		gender: 'unknown',
		homeworld: ['unknown'],
		wiki: 'unknown',
		image: 'unknown',
		born: 'unknown',
		bornLocation: 'unknown',
		died: 'unknown',
		diedLocation: 'unknown',
		species: 'unknown',
		hairColor: 'unknown',
		eyeColor: 'unknown',
		skincolor: 'unknown',
		cybernetics: ['unknown'],
		affiliations: ['unknown'],
		masters: ['unknown'],
		apprentices: ['unknown'],
		formerAffiliations: ['unknown'],
		relatedPlanets: ['unknown'],
		relatedStarships: ['unknown'],
		relatedVehicles: ['unknown'],
		relatedFilms: ['unknown'],
	});
});

export { getCharacters, getCharacterById, deleteCharacter };
