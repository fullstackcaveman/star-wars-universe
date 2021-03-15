import express from 'express';
const router = express.Router();
import {
	getCharacterById,
	getCharacters,
} from '../controllers/characterController.js';

router.route('/').get(getCharacters);
router.route('/:id').get(getCharacterById);

export default router;
