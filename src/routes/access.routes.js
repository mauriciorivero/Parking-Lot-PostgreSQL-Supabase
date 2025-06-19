const express = require('express');
const router = express.Router();
const AccesoSalidas = require('../models/acceso-salidas.model');

// GET all access records
router.get('/', async (req, res) => {
    try {
        const records = await AccesoSalidas.findAll();
        res.json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET access record by ID
router.get('/:id', async (req, res) => {
    try {
        const record = await AccesoSalidas.findById(req.params.id);
        if (record) {
            res.json(record);
        } else {
            res.status(404).json({ message: 'Access record not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET vehicle history
router.get('/vehicle/:vehicleId', async (req, res) => {
    try {
        const history = await AccesoSalidas.obtenerHistorialVehiculo(req.params.vehicleId);
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST register entry
router.post('/entry', async (req, res) => {
    try {
        const { vehiculoId, puerta } = req.body;
        const entry = await AccesoSalidas.registrarEntrada(vehiculoId, puerta);
        res.status(201).json(entry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST register exit
router.post('/exit', async (req, res) => {
    try {
        const { vehiculoId, puerta } = req.body;
        const exit = await AccesoSalidas.registrarSalida(vehiculoId, puerta);
        res.status(201).json(exit);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST create access record
router.post('/', async (req, res) => {
    try {
        const newRecord = await AccesoSalidas.create(req.body);
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT update access record
router.put('/:id', async (req, res) => {
    try {
        const updatedRecord = await AccesoSalidas.update(req.params.id, req.body);
        if (updatedRecord) {
            res.json(updatedRecord);
        } else {
            res.status(404).json({ message: 'Access record not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE access record
router.delete('/:id', async (req, res) => {
    try {
        const deletedRecord = await AccesoSalidas.delete(req.params.id);
        if (deletedRecord) {
            res.json({ message: 'Access record deleted successfully' });
        } else {
            res.status(404).json({ message: 'Access record not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 