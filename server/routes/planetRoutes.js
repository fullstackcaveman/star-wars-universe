import express from 'express';
const router = express.Router();
import {
	getPlanets,
	getPlanetById,
	createPlanet,
	deletePlanet,
	updatePlanet,
} from '../controllers/planetController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getPlanets).post(protect, admin, createPlanet);
router
	.route('/:id')
	.get(getPlanetById)
	.delete(protect, admin, deletePlanet)
	.put(protect, admin, updatePlanet);

export default router;
