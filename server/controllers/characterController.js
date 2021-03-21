import asyncHandler from 'express-async-handler';
import Character from '../models/characterModel.js';

// @desc   Fetch all characters
// @route  GET /api/characters
// @access Public
const getCharacters = asyncHandler(async (req, res) => {
	const characters = await Character.find({});

	res.json(characters);
});

// @desc   Fetch single character
// @route  GET /api/characters/:id
// @access Public
const getCharacterById = asyncHandler(async (req, res) => {
	const character = await Character.findById(req.params.id);

	if (character) {
		res.json(character);
	} else {
		res.status(404);
		throw new Error('Character not found');
	}
});

// @desc   Delete character
// @route  DELETE /api/characters/:id
// @access Private/Admin
const deleteCharacter = asyncHandler(async (req, res) => {
	const character = await Character.findById(req.params.id);

	if (character) {
		await character.remove();
		res.json({ message: 'Character Removed' });
	} else {
		res.status(404);
		throw new Error('Character not found');
	}
});

export { getCharacters, getCharacterById, deleteCharacter };
