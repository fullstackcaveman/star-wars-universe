// Passes async express route exceptions to express error handler
import exceptionHandler from 'express-async-handler';
import Film from '../models/filmModel.js';

// @desc   Fetch all films
// @route  GET /api/films
// @access Public
const getFilms = exceptionHandler(async (req, res) => {
	const films = await Film.find({});

	res.json(films);
});

// @desc   Fetch single film by name
// @route  GET /api/films/info/:pretty_url
// @access Public
const getFilmByName = exceptionHandler(async (req, res) => {
	const film = await Film.find({ pretty_url: req.params.pretty_url });

	if (film) {
		res.json(film[0]);
	} else {
		res.status(404);
		throw new Error('Film not found');
	}
});

// @desc   Fetch single film
// @route  GET /api/films/:id
// @access Public
const getFilmById = exceptionHandler(async (req, res) => {
	const film = await Film.findById(req.params.id);

	if (film) {
		res.json(film);
	} else {
		res.status(404);
		throw new Error('Film not found');
	}
});

// @desc   Delete film
// @route  DELETE /api/films/:id
// @access Private/Admin
const deleteFilm = exceptionHandler(async (req, res) => {
	const film = await Film.findById(req.params.id);

	if (film) {
		await film.remove();
		res.json({ message: 'Film Removed' });
	} else {
		res.status(404);
		throw new Error('Film not found');
	}
});

// @desc   Create a film
// @route  Post /api/films
// @access Private/Admin
const createFilm = exceptionHandler(async (req, res) => {
	const film = new Film({
		title: 'New Film',
		pretty_url: 'new-film',
		episode_id: '',
		opening_crawl: '',
		director: '',
		release_date: '',
		image: '/images/placeholder.jpg',
		characters: [],
		producer: [],
		planets: [],
		starships: [],
		vehicles: [],
		species: [],
	});

	const createdFilm = await film.save();
	res.status(201).json(createdFilm);
});

// @desc   Update a film
// @route  PUT /api/films/:id
// @access Private/Admin
const updateFilm = exceptionHandler(async (req, res) => {
	const {
		title,
		pretty_url,
		episode_id,
		opening_crawl,
		director,
		release_date,
		image,
		characters,
		producer,
		planets,
		starships,
		vehicles,
		species,
	} = req.body;

	const film = await Film.findById(req.params.id);

	if (film) {
		film.title = title;
		film.pretty_url = pretty_url;
		film.episode_id = episode_id;
		film.opening_crawl = opening_crawl;
		film.director = director;
		film.release_date = release_date;
		film.image = image;
		film.characters = characters;
		film.producer = producer;
		film.planets = planets;
		film.starships = starships;
		film.vehicles = vehicles;
		film.species = species;

		const updatedFilm = await film.save();
		res.json(updatedFilm);
	} else {
		res.status(404);
		throw new Error('Film Not Found');
	}
});

export {
	getFilms,
	getFilmById,
	getFilmByName,
	deleteFilm,
	createFilm,
	updateFilm,
};
