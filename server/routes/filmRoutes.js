import express from 'express';
const router = express.Router();
import {
	getFilms,
	getFilmById,
	createFilm,
	deleteFilm,
	updateFilm,
} from '../controllers/filmController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getFilms).post(protect, admin, createFilm);
router
	.route('/:id')
	.get(getFilmById)
	.delete(protect, admin, deleteFilm)
	.put(protect, admin, updateFilm);

export default router;
