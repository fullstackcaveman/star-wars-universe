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

// @desc   Delete planet
// @route  DELETE /api/planets/:id
// @access Private/Admin
const deletePlanet = asyncHandler(async (req, res) => {
	const planet = await Planet.findById(req.params.id);

	if (planet) {
		await planet.remove();
		res.json({ message: 'Planet Removed' });
	} else {
		res.status(404);
		throw new Error('Planet not found');
	}
});

// @desc   Create a planet
// @route  Post /api/planets
// @access Private/Admin
const createPlanet = asyncHandler(async (req, res) => {
	const planet = new Planet({
		name: 'New Planet',
		pretty_url: 'new-planet',
		rotation_period: 'unknown',
		orbital_period: 'unknown',
		diameter: 'unknown',
		surface_water: 'unknown',
		population: 'unknown',
		image: '/images/placeholder.jpg',
		climate: [],
		gravity: [],
		terrain: [],
		residents: [],
		films: [],
		url: 'unknown',
	});

	const createdPlanet = await planet.save();
	res.status(201).json(createdPlanet);
});

// @desc   Update a planet
// @route  PUT /api/planets/:id
// @access Private/Admin
const updatePlanet = asyncHandler(async (req, res) => {
	const {
		name,
		pretty_url,
		rotation_period,
		orbital_period,
		diameter,
		surface_water,
		population,
		climate,
		gravity,
		terrain,
		residents,
		films,
		url,
	} = req.body;

	const planet = await Planet.findById(req.params.id);

	if (planet) {
		planet.name = name;
		planet.pretty_url = pretty_url;
		planet.rotation_period = rotation_period;
		planet.orbital_period = orbital_period;
		planet.diameter = diameter;
		planet.surface_water = surface_water;
		planet.population = population;
		planet.climate = climate;
		planet.gravity = gravity;
		planet.terrain = terrain;
		planet.residents = residents;
		planet.films = films;
		planet.url = url;

		const updatedPlanet = await planet.save();
		res.json(updatedPlanet);
	} else {
		res.status(404);
		throw new Error('Planet Not Found');
	}
});

export { getPlanets, getPlanetById, deletePlanet, createPlanet, updatePlanet };
