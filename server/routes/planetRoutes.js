import express from 'express';
const router = express.Router();
import {
	getPlanets,
	getPlanetById,
	getPlanetByName,
	createPlanet,
	deletePlanet,
	updatePlanet,
} from '../controllers/planetController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/info/:pretty_url').get(getPlanetByName);
router
	.route('/:id')
	.get(getPlanetById)
	.delete(protect, admin, deletePlanet)
	.put(protect, admin, updatePlanet);
router.route('/').get(getPlanets).post(protect, admin, createPlanet);

export default router;
