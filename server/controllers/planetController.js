import asyncHandler from 'express-async-handler';
import Planet from '../models/planetModel.js';

// @desc   Fetch all planets
// @route  GET /api/planets
// @access Public
const getPlanets = asyncHandler(async (req, res) => {
	const planets = await Planet.find({});

	res.json(planets);
});

export { getPlanets };
