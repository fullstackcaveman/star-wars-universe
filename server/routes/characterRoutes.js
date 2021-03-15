import express from 'express';
const router = express.Router();
import {
	getCharacters,
	getCharacterById,
} from '../controllers/characterController.js';

router.route('/').get(getCharacters);
router.route('/:id').get(getCharacterById);

export default router;
