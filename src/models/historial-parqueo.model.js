const BaseModel = require('./base.model');

class HistorialParqueo extends BaseModel {
    constructor() {
        super('HISTORIAL_PARQUEO', [
            'CELDA_id',
            'VEHICULO_id',
            'fecha_hora'
        ]);
    }

    async registrarParqueo(celdaId, vehiculoId) {
        try {
            return await this.create({
                CELDA_id: celdaId,
                VEHICULO_id: vehiculoId,
                fecha_hora: new Date()
            });
        } catch (error) {
            throw new Error(`Error registering parking: ${error.message}`);
        }
    }

    async obtenerHistorialCelda(celdaId) {
        try {
            return await this.query(
                `SELECT h.*, v.placa, v.marca, v.modelo, u.primer_nombre, u.primer_apellido
                 FROM "HISTORIAL_PARQUEO" h
                 JOIN "VEHICULO" v ON h.VEHICULO_id = v.id
                 JOIN "USUARIO" u ON v.USUARIO_id_usuario = u.id_usuario
                 WHERE h.CELDA_id = $1
                 ORDER BY h.fecha_hora DESC`,
                [celdaId]
            );
        } catch (error) {
            throw new Error(`Error getting cell history: ${error.message}`);
        }
    }

    async obtenerHistorialVehiculo(vehiculoId) {
        try {
            return await this.query(
                `SELECT h.*, c.tipo as tipo_celda, c.estado
                 FROM "HISTORIAL_PARQUEO" h
                 JOIN "CELDA" c ON h.CELDA_id = c.id
                 WHERE h.VEHICULO_id = $1
                 ORDER BY h.fecha_hora DESC`,
                [vehiculoId]
            );
        } catch (error) {
            throw new Error(`Error getting vehicle parking history: ${error.message}`);
        }
    }

    async obtenerUltimoParqueo(vehiculoId) {
        try {
            const result = await this.query(
                `SELECT h.*, c.tipo as tipo_celda, c.estado
                 FROM "HISTORIAL_PARQUEO" h
                 JOIN "CELDA" c ON h.CELDA_id = c.id
                 WHERE h.VEHICULO_id = $1
                 ORDER BY h.fecha_hora DESC
                 LIMIT 1`,
                [vehiculoId]
            );
            return result[0];
        } catch (error) {
            throw new Error(`Error getting last parking: ${error.message}`);
        }
    }
}

module.exports = new HistorialParqueo(); 