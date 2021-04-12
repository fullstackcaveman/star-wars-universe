import express from 'express';
const router = express.Router();
import {
	getCharacters,
	getCharacterById,
	getCharacterByName,
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

router.route('/info/:pretty_url').get(getCharacterByName);

export default router;
