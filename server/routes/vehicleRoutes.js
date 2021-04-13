import express from 'express';

const router = express.Router();

import {
	getVehicles,
	getVehicleById,
	deleteVehicle,
	createVehicle,
	updateVehicle,
	getVehicleByName,
} from '../controllers/vehicleController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getVehicles).post(protect, admin, createVehicle);
router
	.route('/:id')
	.get(getVehicleById)
	.delete(protect, admin, deleteVehicle)
	.put(protect, admin, updateVehicle);

router.route('/info/:pretty_url').get(getVehicleByName);

export default router;
