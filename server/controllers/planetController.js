// Passes async express route exceptions to express error handler
import exceptionHandler from 'express-async-handler';
import Planet from '../models/planetModel.js';

// @desc   Fetch all planets
// @route  GET /api/planets
// @access Public
const getPlanets = exceptionHandler(async (req, res) => {
	const planets = await Planet.find({});

	res.json(planets);
});

// @desc   Fetch single planet
// @route  GET /api/planets/:id
// @access Public
const getPlanetById = exceptionHandler(async (req, res) => {
	const planet = await Planet.findById(req.params.id);

	if (planet) {
		res.json(planet);
	} else {
		res.status(404);
		throw new Error('Planet not found');
	}
});

// @desc   Fetch single planet by pretty_url
// @route  GET /api/planets/info/:pretty_url
// @access Public
const getPlanetByName = exceptionHandler(async (req, res) => {
	const planet = await Planet.find({ pretty_url: req.params.pretty_url });

	if (planet) {
		res.json(planet[0]);
	} else {
		res.status(404);
		throw new Error('Planet not found');
	}
});

// @desc   Delete planet
// @route  DELETE /api/planets/:id
// @access Private/Admin
const deletePlanet = exceptionHandler(async (req, res) => {
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
const createPlanet = exceptionHandler(async (req, res) => {
	const planet = new Planet({
		name: 'New Planet',
		pretty_url: 'new-planet',
		rotation_period: 'unknown',
		orbital_period: 'unknown',
		diameter: 'unknown',
		surface_water: 'unknown',
		population: 'unknown',
		image: '/images/placeholder.jpg',
		region: 'unknown',
		sector: 'unknown',
		system: 'unknown',
		distance_from_core: 'unknown',
		classification: 'unknown',
		atmosphere: 'unknown',
		grid_coords: 'unknown',
		climate: [],
		gravity: [],
		terrain: [],
		residents: [],
		films: [],
		suns: [],
		moons: [],
		trade_routes: [],
		points_of_interest: [],
		flora: [],
		fauna: [],
		native_species: [],
		immigrated_species: [],
		primary_languages: [],
		major_cities: [],
		major_imports: [],
		major_exports: [],
		affiliations: [],
	});

	const createdPlanet = await planet.save();
	res.status(201).json(createdPlanet);
});

// @desc   Update a planet
// @route  PUT /api/planets/:id
// @access Private/Admin
const updatePlanet = exceptionHandler(async (req, res) => {
	const {
		name,
		pretty_url,
		rotation_period,
		orbital_period,
		diameter,
		surface_water,
		population,
		image,
		climate,
		gravity,
		terrain,
		residents,
		films,
		region,
		sector,
		system,
		distance_from_core,
		classification,
		atmosphere,
		grid_coords,
		suns,
		moons,
		trade_routes,
		points_of_interest,
		flora,
		fauna,
		native_species,
		immigrated_species,
		primary_languages,
		major_cities,
		major_imports,
		major_exports,
		affiliations,
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
		planet.image = image;
		planet.region = region;
		planet.sector = sector;
		planet.system = system;
		planet.distance_from_core = distance_from_core;
		planet.classification = classification;
		planet.atmosphere = atmosphere;
		planet.grid_coords = grid_coords;
		planet.suns = suns;
		planet.moons = moons;
		planet.trade_routes = trade_routes;
		planet.points_of_interest = points_of_interest;
		planet.flora = flora;
		planet.fauna = fauna;
		planet.native_species = native_species;
		planet.immigrated_species = immigrated_species;
		planet.primary_languages = primary_languages;
		planet.major_cities = major_cities;
		planet.major_imports = major_imports;
		planet.major_exports = major_exports;
		planet.affiliations = affiliations;

		const updatedPlanet = await planet.save();
		res.json(updatedPlanet);
	} else {
		res.status(404);
		throw new Error('Planet Not Found');
	}
});

export {
	getPlanets,
	getPlanetById,
	getPlanetByName,
	deletePlanet,
	createPlanet,
	updatePlanet,
};
