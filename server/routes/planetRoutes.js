import express from 'express';
const router = express.Router();
import { getPlanets } from '../controllers/planetController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getPlanets);

export default router;
