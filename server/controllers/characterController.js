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
		name: 'New Character',
		pretty_url: 'new-character',
		height: 'unknown',
		mass: 'unknown',
		gender: 'unknown',
		homeworld: ['unknown'],
		wiki: 'unknown',
		image: '/images/placeholder.jpg',
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

	const createdCharacter = await character.save();
	res.status(201).json(createdCharacter);
});

// @desc   Update a character
// @route  PUT /api/characters/:id
// @access Private/Admin
const updateCharacter = asyncHandler(async (req, res) => {
	const {
		name,
		pretty_url,
		height,
		mass,
		gender,
		homeworld,
		wiki,
		image,
		born,
		bornLocation,
		died,
		diedLocation,
		species,
		hairColor,
		eyeColor,
		skincolor,
		cybernetics,
		affiliations,
		masters,
		apprentices,
		formerAffiliations,
		relatedPlanets,
		relatedStarships,
		relatedVehicles,
		relatedFilms,
	} = req.body;

	const character = await Character.findById(req.params.id);

	if (character) {
		character.name = name;
		character.pretty_url = pretty_url;
		character.heght = height;
		character.mass = mass;
		character.gender = gender;
		character.homeworld = homeworld;
		character.wiki = wiki;
		character.image = image;
		character.born = born;
		character.bornLocation = bornLocation;
		character.died = died;
		character.diedLocation = diedLocation;
		character.species = species;
		character.hairColor = hairColor;
		character.eyeColor = eyeColor;
		character.skincolor = skincolor;
		character.cybernetics = cybernetics;
		character.affiliations = affiliations;
		character.masters = masters;
		character.apprentices = apprentices;
		character.formerAffiliations = formerAffiliations;
		character.relatedPlanets = relatedPlanets;
		character.relatedStarships = relatedStarships;
		character.relatedVehicles = relatedVehicles;
		character.relatedFilms = relatedFilms;

		const updatedCharacter = await character.save();
		res.json(updatedCharacter);
	} else {
		res.status(404);
		throw new Error('Character Not Found');
	}
});

export {
	getCharacters,
	getCharacterById,
	deleteCharacter,
	createCharacter,
	updateCharacter,
};
