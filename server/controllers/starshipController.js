import asyncHandler from 'express-async-handler';
import Starship from '../models/starshipModel.js';

// @desc   Fetch all starships
// @route  GET /api/starships
// @access Public
const getStarships = asyncHandler(async (req, res) => {
	const starships = await Starship.find({});

	res.json(starships);
});

// @desc   Fetch single starship by name
// @route  GET /api/starships/info/:pretty_url
// @access Public
const getStarshipByName = asyncHandler(async (req, res) => {
	const starship = await Starship.find({ pretty_url: req.params.pretty_url });

	if (starship) {
		res.json(starship[0]);
	} else {
		res.status(404);
		throw new Error('Starship not found');
	}
});

// @desc   Fetch single starship
// @route  GET /api/starships/:id
// @access Public
const getStarshipById = asyncHandler(async (req, res) => {
	const starship = await Starship.findById(req.params.id);

	if (starship) {
		res.json(starship);
	} else {
		res.status(404);
		throw new Error('Starship not found');
	}
});

// @desc   Delete starship
// @route  DELETE /api/starships/:id
// @access Private/Admin
const deleteStarship = asyncHandler(async (req, res) => {
	const starship = await Starship.findById(req.params.id);

	if (starship) {
		await starship.remove();
		res.json({ message: 'Starship Removed' });
	} else {
		res.status(404);
		throw new Error('Starship not found');
	}
});

// @desc   Create a starship
// @route  Post /api/starships
// @access Private/Admin
const createStarship = asyncHandler(async (req, res) => {
	const starship = new Starship({
		name: 'New Starship',
		pretty_url: 'new-starship',
		image: '/images/placeholder.jpg',
		ship_model: 'unknown',
		cost_in_credits: 'unknown',
		length: 'unknown',
		max_atmosphering_speed: 'unknown',
		crew: 'unknown',
		passengers: 'unknown',
		cargo_capacity: 'unknown',
		consumables: 'unknown',
		hyperdrive_rating: 'unknown',
		MGLT: 'unknown',
		starship_class: 'unknown',
		manufacturer: [],
		pilots: [],
		films: [],
	});

	const createdStarship = await starship.save();
	res.status(201).json(createdStarship);
});

// @desc   Update a starship
// @route  PUT /api/starships/:id
// @access Private/Admin
const updateStarship = asyncHandler(async (req, res) => {
	const {
		name,
		pretty_url,
		ship_model,
		cost_in_credits,
		length,
		max_atmosphering_speed,
		crew,
		passengers,
		cargo_capacity,
		consumables,
		hyperdrive_rating,
		MGLT,
		starship_class,
		manufacturer,
		pilots,
		films,
		image,
	} = req.body;

	const starship = await Starship.findById(req.params.id);

	if (starship) {
		starship.name = name;
		starship.pretty_url = pretty_url;
		starship.ship_model = ship_model;
		starship.cost_in_credits = cost_in_credits;
		starship.length = length;
		starship.max_atmosphering_speed = max_atmosphering_speed;
		starship.crew = crew;
		starship.passengers = passengers;
		starship.cargo_capacity = cargo_capacity;
		starship.consumables = consumables;
		starship.hyperdrive_rating = hyperdrive_rating;
		starship.MGLT = MGLT;
		starship.starship_class = starship_class;
		starship.manufacturer = manufacturer;
		starship.pilots = pilots;
		starship.films = films;
		starship.image = image;

		const updatedStarship = await starship.save();
		res.json(updatedStarship);
	} else {
		res.status(404);
		throw new Error('Starship Not Found');
	}
});

export {
	getStarships,
	getStarshipById,
	getStarshipByName,
	deleteStarship,
	createStarship,
	updateStarship,
};
