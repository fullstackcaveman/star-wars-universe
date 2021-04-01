import express from 'express';
const router = express.Router();
import {
	getStarships,
	getStarshipById,
	deleteStarship,
	createStarship,
	updateStarship,
} from '../controllers/starshipController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getStarships).post(protect, admin, createStarship);
router
	.route('/:id')
	.get(getStarshipById)
	.delete(protect, admin, deleteStarship)
	.put(protect, admin, updateStarship);

export default router;
