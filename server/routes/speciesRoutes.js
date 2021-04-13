import express from 'express';
const router = express.Router();
import {
	getSpecies,
	getSpeciesById,
	deleteSpecies,
	createSpecies,
	updateSpecies,
	getSpeciesByName,
} from '../controllers/speciesController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getSpecies).post(protect, admin, createSpecies);
router
	.route('/:id')
	.get(getSpeciesById)
	.delete(protect, admin, deleteSpecies)
	.put(protect, admin, updateSpecies);

router.route('/info/:pretty_url').get(getSpeciesByName);

export default router;
