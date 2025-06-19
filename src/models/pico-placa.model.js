const BaseModel = require('./base.model');

class PicoPlaca extends BaseModel {
    constructor() {
        super('PICO_PLACA', [
            'tipo_vehiculo',
            'numero',
            'dia'
        ]);
    }

    async verificarPicoPlaca(placa, tipoVehiculo) {
        try {
            const dia = this.obtenerDiaSemana();
            const ultimoDigito = placa.slice(-1);

            const result = await this.query(
                `SELECT * FROM "PICO_PLACA" 
                 WHERE tipo_vehiculo = $1 
                 AND numero = $2 
                 AND dia = $3`,
                [tipoVehiculo, ultimoDigito, dia]
            );

            return result.length > 0;
        } catch (error) {
            throw new Error(`Error verifying pico y placa: ${error.message}`);
        }
    }

    obtenerDiaSemana() {
        const dias = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
        return dias[new Date().getDay()];
    }

    async obtenerRestriccionesDia(dia) {
        try {
            return await this.query(
                `SELECT * FROM "PICO_PLACA" WHERE dia = $1`,
                [dia]
            );
        } catch (error) {
            throw new Error(`Error getting day restrictions: ${error.message}`);
        }
    }

    async obtenerRestriccionesPorTipo(tipoVehiculo) {
        try {
            return await this.query(
                `SELECT * FROM "PICO_PLACA" WHERE tipo_vehiculo = $1`,
                [tipoVehiculo]
            );
        } catch (error) {
            throw new Error(`Error getting vehicle type restrictions: ${error.message}`);
        }
    }
}

module.exports = new PicoPlaca(); 