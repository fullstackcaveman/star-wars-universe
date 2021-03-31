import asyncHandler from 'express-async-handler';
import Species from '../models/speciesModel.js';

// @desc   Fetch all species
// @route  GET /api/species
// @access Public
const getSpecies = asyncHandler(async (req, res) => {
	const species = await Species.find({});

	res.json(species);
});

// @desc   Fetch single species
// @route  GET /api/species/:id
// @access Public
const getSpeciesById = asyncHandler(async (req, res) => {
	const species = await Species.findById(req.params.id);

	if (species) {
		res.json(species);
	} else {
		res.status(404);
		throw new Error('Species not found');
	}
});

// @desc   Delete species
// @route  DELETE /api/species/:id
// @access Private/Admin
const deleteSpecies = asyncHandler(async (req, res) => {
	const species = await Species.findById(req.params.id);

	if (species) {
		await species.remove();
		res.json({ message: 'Species Removed' });
	} else {
		res.status(404);
		throw new Error('Species not found');
	}
});

// @desc   Create a species
// @route  Post /api/species
// @access Private/Admin
const createSpecies = asyncHandler(async (req, res) => {
	const species = new Species({
		name: 'New Species',
		pretty_url: 'new-species',
		classification: 'unknown',
		designation: 'unknown',
		average_height: 'unknown',
		skin_colors: ['unknown'],
		hair_colors: ['unknown'],
		eye_colors: ['unknown'],
		average_lifespan: 'unknown',
		homeworld: 'unknown',
		language: 'unknown',
		image: '/images/placeholder.jpg',
		people: ['unknown'],
		films: ['unknown'],
	});

	const createdCharacter = await character.save();
	res.status(201).json(createdCharacter);
});

// @desc   Update a species
// @route  PUT /api/species/:id
// @access Private/Admin
const updateSpecies = asyncHandler(async (req, res) => {
	const {
		name,
		pretty_url,
		classification,
		designation,
		average_height,
		skin_colors,
		hair_colors,
		eye_colors,
		average_lifespan,
		homeworld,
		language,
		image,
		people,
		films,
	} = req.body;

	const species = await Species.findById(req.params.id);

	if (species) {
		species.name = name;
		species.pretty_url = pretty_url;
		species.classification = classification;
		species.designation = designation;
		species.average_height = average_height;
		species.skin_colors = skin_colors;
		species.hair_colors = hair_colors;
		species.eye_colors = eye_colors;
		species.average_lifespan = average_lifespan;
		species.homeworld = homeworld;
		species.language = language;
		species.image = image;
		species.people = people;
		species.films = films;

		const updatedSpecies = await species.save();
		res.json(updatedSpecies);
	} else {
		res.status(404);
		throw new Error('Species Not Found');
	}
});

export {
	getSpecies,
	getSpeciesById,
	deleteSpecies,
	createSpecies,
	updateSpecies,
};
