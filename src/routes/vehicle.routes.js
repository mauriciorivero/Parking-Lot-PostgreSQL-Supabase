const express = require('express');
const router = express.Router();
const Vehiculo = require('../models/vehiculo.model');

// GET all vehicles
router.get('/', async (req, res) => {
    try {
        const vehicles = await Vehiculo.findAll();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET vehicle by ID
router.get('/:id', async (req, res) => {
    try {
        const vehicle = await Vehiculo.findById(req.params.id);
        if (vehicle) {
            res.json(vehicle);
        } else {
            res.status(404).json({ message: 'Vehicle not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET vehicles by user
router.get('/user/:userId', async (req, res) => {
    try {
        const vehicles = await Vehiculo.findByUsuario(req.params.userId);
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET vehicle by plate
router.get('/plate/:placa', async (req, res) => {
    try {
        const vehicle = await Vehiculo.findByPlaca(req.params.placa);
        if (vehicle) {
            res.json(vehicle);
        } else {
            res.status(404).json({ message: 'Vehicle not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST create new vehicle
router.post('/', async (req, res) => {
    try {
        const newVehicle = await Vehiculo.create(req.body);
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT update vehicle
router.put('/:id', async (req, res) => {
    try {
        const updatedVehicle = await Vehiculo.update(req.params.id, req.body);
        if (updatedVehicle) {
            res.json(updatedVehicle);
        } else {
            res.status(404).json({ message: 'Vehicle not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE vehicle
router.delete('/:id', async (req, res) => {
    try {
        const deletedVehicle = await Vehiculo.delete(req.params.id);
        if (deletedVehicle) {
            res.json({ message: 'Vehicle deleted successfully' });
        } else {
            res.status(404).json({ message: 'Vehicle not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 