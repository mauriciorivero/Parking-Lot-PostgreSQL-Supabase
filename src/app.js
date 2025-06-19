const express = require('express');
const cors = require('cors');
const sql = require('./config/db.config');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '../')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Import routes
const userRoutes = require('./routes/user.routes');
const vehicleRoutes = require('./routes/vehicle.routes');
const accessRoutes = require('./routes/access.routes');
const cellRoutes = require('./routes/cell.routes');
const incidentRoutes = require('./routes/incident.routes');
const picoPlacaRoutes = require('./routes/pico-placa.routes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/access', accessRoutes);
app.use('/api/cells', cellRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/pico-placa', picoPlacaRoutes);

const PORT = process.env.PORT || 3000;

// Test database connection and start server
async function startServer() {
    try {
        // Test the connection
        await sql`SELECT 1`;
        console.log('Database connected successfully');
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    }
}

startServer(); 