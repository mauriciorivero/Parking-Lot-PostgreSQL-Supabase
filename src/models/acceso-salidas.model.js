const BaseModel = require('./base.model');

class AccesoSalidas extends BaseModel {
    constructor() {
        super('ACCESO_SALIDAS', [
            'movimiento',
            'fecha_hora',
            'puerta',
            'tiempo_estadia',
            'VEHICULO_id'
        ]);
    }

    async registrarEntrada(vehiculoId, puerta) {
        try {
            return await this.create({
                movimiento: 'Entrada',
                fecha_hora: new Date(),
                puerta,
                tiempo_estadia: 0,
                VEHICULO_id: vehiculoId
            });
        } catch (error) {
            throw new Error(`Error registering entrada: ${error.message}`);
        }
    }

    async registrarSalida(vehiculoId, puerta) {
        try {
            // Buscar la última entrada del vehículo
            const ultimaEntrada = await this.query(
                `SELECT fecha_hora 
                 FROM "ACCESO_SALIDAS" 
                 WHERE VEHICULO_id = $1 AND movimiento = 'Entrada'
                 ORDER BY fecha_hora DESC LIMIT 1`,
                [vehiculoId]
            );

            if (!ultimaEntrada[0]) {
                throw new Error('No se encontró registro de entrada para este vehículo');
            }

            const tiempoEstadia = Math.floor(
                (new Date() - new Date(ultimaEntrada[0].fecha_hora)) / 1000
            );

            return await this.create({
                movimiento: 'Salida',
                fecha_hora: new Date(),
                puerta,
                tiempo_estadia: tiempoEstadia,
                VEHICULO_id: vehiculoId
            });
        } catch (error) {
            throw new Error(`Error registering salida: ${error.message}`);
        }
    }

    async obtenerHistorialVehiculo(vehiculoId) {
        try {
            return await this.query(
                `SELECT a.*, v.placa, v.marca, v.modelo
                 FROM "ACCESO_SALIDAS" a
                 JOIN "VEHICULO" v ON a.VEHICULO_id = v.id
                 WHERE v.id = $1
                 ORDER BY a.fecha_hora DESC`,
                [vehiculoId]
            );
        } catch (error) {
            throw new Error(`Error getting vehicle history: ${error.message}`);
        }
    }
}

module.exports = new AccesoSalidas(); 