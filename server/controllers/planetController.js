import asyncHandler from 'express-async-handler';
import Planet from '../models/planetModel.js';

// @desc   Fetch all planets
// @route  GET /api/planets
// @access Public
const getPlanets = asyncHandler(async (req, res) => {
	const planets = await Planet.find({});

	res.json(planets);
});

// @desc   Fetch single planet
// @route  GET /api/planets/:id
// @access Public
const getPlanetById = asyncHandler(async (req, res) => {
	const planet = await Planet.findById(req.params.id);

	if (planet) {
		res.json(planet);
	} else {
		res.status(404);
		throw new Error('Planet not found');
	}
});

export { getPlanets, getPlanetById };
