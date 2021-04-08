import asyncHandler from 'express-async-handler';
import Vehicle from '../models/vehicleModel.js';

// @desc   Fetch all vehicles
// @route  GET /api/vehicles
// @access Public
const getVehicles = asyncHandler(async (req, res) => {
	const vehicles = await Vehicle.find({});

	res.json(vehicles);
});

// @desc   Fetch single vehicle
// @route  GET /api/vehicles/:id
// @access Public
const getVehicleById = asyncHandler(async (req, res) => {
	const vehicle = await Vehicle.findById(req.params.id);

	if (vehicle) {
		res.json(vehicle);
	} else {
		res.status(404);
		throw new Error('Vehicle not found');
	}
});

// @desc   Delete vehicle
// @route  DELETE /api/vehicles/:id
// @access Private/Admin
const deleteVehicle = asyncHandler(async (req, res) => {
	const vehicle = await Vehicle.findById(req.params.id);

	if (vehicle) {
		await vehicle.remove();
		res.json({ message: 'Vehicle Removed' });
	} else {
		res.status(404);
		throw new Error('Vehicle not found');
	}
});

// @desc   Create a vehicle
// @route  Post /api/vehicles
// @access Private/Admin
const createVehicle = asyncHandler(async (req, res) => {
	const vehicle = new Vehicle({
		name: 'New Vehicle',
		pretty_url: 'new-vehicle',
		image: '/images/placeholder.jpg',
		vehicle_model: 'unknown',
		cost_in_credits: 'unknown',
		length: 'unknown',
		max_atmosphering_speed: 'unknown',
		crew: 'unknown',
		passengers: 'unknown',
		cargo_capacity: 'unknown',
		consumables: 'unknown',
		vehicle_class: 'unknown',
		manufacturer: [],
		pilots: [],
		films: [],
	});

	const createdVehicle = await vehicle.save();
	res.status(201).json(createdVehicle);
});

// @desc   Update a vehicle
// @route  PUT /api/vehicles/:id
// @access Private/Admin
const updateVehicle = asyncHandler(async (req, res) => {
	const {
		name,
		pretty_url,
		image,
		vehicle_model,
		cost_in_credits,
		length,
		max_atmosphering_speed,
		crew,
		passengers,
		cargo_capacity,
		consumables,
		vehicle_class,
		manufacturer,
		pilots,
		films,
	} = req.body;

	const vehicle = await Vehicle.findById(req.params.id);

	if (vehicle) {
		vehicle.name = name;
		vehicle.pretty_url = pretty_url;
		vehicle.image = image;
		vehicle.vehicle_model = vehicle_model;
		vehicle.cost_in_credits = cost_in_credits;
		vehicle.length = length;
		vehicle.max_atmosphering_speed = max_atmosphering_speed;
		vehicle.crew = crew;
		vehicle.passengers = passengers;
		vehicle.cargo_capacity = cargo_capacity;
		vehicle.consumables = consumables;
		vehicle.vehicle_class = vehicle_class;
		vehicle.manufacturer = manufacturer;
		vehicle.pilots = pilots;
		vehicle.films = films;

		const updatedVehicle = await vehicle.save();
		res.json(updatedVehicle);
	} else {
		res.status(404);
		throw new Error('Vehicle Not Found');
	}
});

export {
	getVehicles,
	getVehicleById,
	deleteVehicle,
	createVehicle,
	updateVehicle,
};
