// Passes async express route exceptions to express error handler
import exceptionHandler from 'express-async-handler';
import Species from '../models/speciesModel.js';

// @desc   Fetch all species
// @route  GET /api/species
// @access Public
const getSpecies = exceptionHandler(async (req, res) => {
	const species = await Species.find({});

	res.json(species);
});

// @desc   Fetch single species by name
// @route  GET /api/species/info/:pretty_url
// @access Public
const getSpeciesByName = exceptionHandler(async (req, res) => {
	const species = await Species.find({ pretty_url: req.params.pretty_url });

	if (species) {
		res.json(species[0]);
	} else {
		res.status(404);
		throw new Error('Species not found');
	}
});

// @desc   Fetch single species
// @route  GET /api/species/:id
// @access Public
const getSpeciesById = exceptionHandler(async (req, res) => {
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
const deleteSpecies = exceptionHandler(async (req, res) => {
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
const createSpecies = exceptionHandler(async (req, res) => {
	const species = new Species({
		name: 'New Species',
		pretty_url: 'new-species',
		classification: '',
		designation: '',
		average_height: '',
		skin_colors: [],
		hair_colors: [],
		eye_colors: [],
		average_lifespan: '',
		homeworld: '',
		language: '',
		image: '/images/placeholder.jpg',
		people: [],
		relatedFilms: [],
	});

	const createdSpecies = await species.save();
	res.status(201).json(createdSpecies);
});

// @desc   Update a species
// @route  PUT /api/species/:id
// @access Private/Admin
const updateSpecies = exceptionHandler(async (req, res) => {
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
		relatedFilms,
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
		species.relatedFilms = relatedFilms;

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
	getSpeciesByName,
	deleteSpecies,
	createSpecies,
	updateSpecies,
};
