import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Character from '../models/characterModel.js';

// @desc Fetch all characters
// @route GET /api/characters
// @access Public
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const characters = await Character.find({});

		res.json(characters);
	})
);

// @desc Fetch single character
// @route GET /api/characters/:id
// @access Public
router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const character = await Character.findById(req.params.id);

		if (character) {
			res.json(character);
		} else {
			res.status(404);
			throw new Error('Character not found');
		}
	})
);

export default router;
