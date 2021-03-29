import express from 'express';
const router = express.Router();
import { getPlanets, getPlanetById } from '../controllers/planetController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getPlanets);
router.route('/:id').get(getPlanetById);

export default router;
