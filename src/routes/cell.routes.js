const express = require('express');
const router = express.Router();
const Celda = require('../models/celda.model');

// GET all cells
router.get('/', async (req, res) => {
    try {
        const cells = await Celda.findAll();
        res.json(cells);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET cell by ID
router.get('/:id', async (req, res) => {
    try {
        const cell = await Celda.findById(req.params.id);
        if (cell) {
            res.json(cell);
        } else {
            res.status(404).json({ message: 'Cell not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET available cells by type
router.get('/available/:tipo', async (req, res) => {
    try {
        const availableCells = await Celda.findDisponibles(req.params.tipo);
        res.json(availableCells);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET available count
router.get('/stats/available', async (req, res) => {
    try {
        const stats = await Celda.contarDisponibles();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST create new cell
router.post('/', async (req, res) => {
    try {
        const newCell = await Celda.create(req.body);
        res.status(201).json(newCell);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT update cell
router.put('/:id', async (req, res) => {
    try {
        const updatedCell = await Celda.update(req.params.id, req.body);
        if (updatedCell) {
            res.json(updatedCell);
        } else {
            res.status(404).json({ message: 'Cell not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST occupy cell
router.post('/:id/occupy', async (req, res) => {
    try {
        const occupiedCell = await Celda.ocuparCelda(req.params.id);
        if (occupiedCell) {
            res.json(occupiedCell);
        } else {
            res.status(404).json({ message: 'Cell not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST free cell
router.post('/:id/free', async (req, res) => {
    try {
        const freedCell = await Celda.liberarCelda(req.params.id);
        if (freedCell) {
            res.json(freedCell);
        } else {
            res.status(404).json({ message: 'Cell not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE cell
router.delete('/:id', async (req, res) => {
    try {
        const deletedCell = await Celda.delete(req.params.id);
        if (deletedCell) {
            res.json({ message: 'Cell deleted successfully' });
        } else {
            res.status(404).json({ message: 'Cell not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 