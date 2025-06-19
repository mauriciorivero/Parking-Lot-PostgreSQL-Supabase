const express = require('express');
const router = express.Router();
const Incidencia = require('../models/incidencia.model');

// GET all incidents
router.get('/', async (req, res) => {
    try {
        const incidents = await Incidencia.findAll();
        res.json(incidents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET incident by ID
router.get('/:id', async (req, res) => {
    try {
        const incident = await Incidencia.findById(req.params.id);
        if (incident) {
            res.json(incident);
        } else {
            res.status(404).json({ message: 'Incident not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET incidents by name
router.get('/search/:nombre', async (req, res) => {
    try {
        const incidents = await Incidencia.findByNombre(req.params.nombre);
        res.json(incidents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET incident statistics
router.get('/stats/by-type', async (req, res) => {
    try {
        const stats = await Incidencia.getIncidentesPorTipo();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST create new incident
router.post('/', async (req, res) => {
    try {
        const newIncident = await Incidencia.create(req.body);
        res.status(201).json(newIncident);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT update incident
router.put('/:id', async (req, res) => {
    try {
        const updatedIncident = await Incidencia.update(req.params.id, req.body);
        if (updatedIncident) {
            res.json(updatedIncident);
        } else {
            res.status(404).json({ message: 'Incident not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE incident
router.delete('/:id', async (req, res) => {
    try {
        const deletedIncident = await Incidencia.delete(req.params.id);
        if (deletedIncident) {
            res.json({ message: 'Incident deleted successfully' });
        } else {
            res.status(404).json({ message: 'Incident not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 