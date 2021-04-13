import express from 'express';
const router = express.Router();
import {
	getFilms,
	getFilmById,
	createFilm,
	deleteFilm,
	updateFilm,
	getFilmByName,
} from '../controllers/filmController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getFilms).post(protect, admin, createFilm);
router
	.route('/:id')
	.get(getFilmById)
	.delete(protect, admin, deleteFilm)
	.put(protect, admin, updateFilm);

router.route('/info/:pretty_url').get(getFilmByName);

export default router;
