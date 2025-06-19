const express = require('express');
const router = express.Router();
const PicoPlaca = require('../models/pico-placa.model');

// GET all pico y placa rules
router.get('/', async (req, res) => {
    try {
        const rules = await PicoPlaca.findAll();
        res.json(rules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET rule by ID
router.get('/:id', async (req, res) => {
    try {
        const rule = await PicoPlaca.findById(req.params.id);
        if (rule) {
            res.json(rule);
        } else {
            res.status(404).json({ message: 'Rule not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET restrictions by day
router.get('/day/:dia', async (req, res) => {
    try {
        const restrictions = await PicoPlaca.obtenerRestriccionesDia(req.params.dia);
        res.json(restrictions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET restrictions by vehicle type
router.get('/type/:tipoVehiculo', async (req, res) => {
    try {
        const restrictions = await PicoPlaca.obtenerRestriccionesPorTipo(req.params.tipoVehiculo);
        res.json(restrictions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST verify pico y placa
router.post('/verify', async (req, res) => {
    try {
        const { placa, tipoVehiculo } = req.body;
        const isRestricted = await PicoPlaca.verificarPicoPlaca(placa, tipoVehiculo);
        res.json({ 
            placa, 
            tipoVehiculo, 
            isRestricted,
            dia: PicoPlaca.obtenerDiaSemana()
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// POST create new rule
router.post('/', async (req, res) => {
    try {
        const newRule = await PicoPlaca.create(req.body);
        res.status(201).json(newRule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT update rule
router.put('/:id', async (req, res) => {
    try {
        const updatedRule = await PicoPlaca.update(req.params.id, req.body);
        if (updatedRule) {
            res.json(updatedRule);
        } else {
            res.status(404).json({ message: 'Rule not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE rule
router.delete('/:id', async (req, res) => {
    try {
        const deletedRule = await PicoPlaca.delete(req.params.id);
        if (deletedRule) {
            res.json({ message: 'Rule deleted successfully' });
        } else {
            res.status(404).json({ message: 'Rule not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 