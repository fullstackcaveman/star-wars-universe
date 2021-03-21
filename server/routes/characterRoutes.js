import express from 'express';
const router = express.Router();
import {
	getCharacters,
	getCharacterById,
	deleteCharacter,
} from '../controllers/characterController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getCharacters);
router
	.route('/:id')
	.get(getCharacterById)
	.delete(protect, admin, deleteCharacter);

export default router;
