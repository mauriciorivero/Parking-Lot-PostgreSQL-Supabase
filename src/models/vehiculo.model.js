const BaseModel = require('./base.model');

class Vehiculo extends BaseModel {
    constructor() {
        super('VEHICULO', [
            'placa',
            'color',
            'modelo',
            'marca',
            'tipo',
            'USUARIO_id_usuario'
        ]);
    }

    async findByPlaca(placa) {
        try {
            const result = await this.query(
                'SELECT * FROM "VEHICULO" WHERE placa = $1',
                [placa]
            );
            return result[0];
        } catch (error) {
            throw new Error(`Error finding vehicle by placa: ${error.message}`);
        }
    }

    async findByUsuario(usuarioId) {
        try {
            const result = await this.query(
                'SELECT * FROM "VEHICULO" WHERE USUARIO_id_usuario = $1',
                [usuarioId]
            );
            return result;
        } catch (error) {
            throw new Error(`Error finding vehicles by usuario: ${error.message}`);
        }
    }

    async findWithDetails(vehiculoId) {
        try {
            const result = await this.query(
                `SELECT v.*, u.primer_nombre, u.primer_apellido, u.numero_celular
                 FROM "VEHICULO" v
                 JOIN "USUARIO" u ON v.USUARIO_id_usuario = u.id_usuario
                 WHERE v.id = $1`,
                [vehiculoId]
            );
            return result[0];
        } catch (error) {
            throw new Error(`Error finding vehicle with details: ${error.message}`);
        }
    }
}

module.exports = new Vehiculo(); 