import express from 'express';
const router = express.Router();
import {
	getCharacters,
	getCharacterById,
	deleteCharacter,
	createCharacter,
	updateCharacter,
} from '../controllers/characterController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getCharacters).post(protect, admin, createCharacter);
router
	.route('/:id')
	.get(getCharacterById)
	.delete(protect, admin, deleteCharacter)
	.put(protect, admin, updateCharacter);

export default router;
