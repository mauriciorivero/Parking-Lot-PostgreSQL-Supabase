const BaseModel = require('./base.model');

class Incidencia extends BaseModel {
    constructor() {
        super('INCIDENCIA', [
            'nombre'
        ]);
    }

    async findByNombre(nombre) {
        try {
            const result = await this.query(
                'SELECT * FROM "INCIDENCIA" WHERE nombre ILIKE $1',
                [`%${nombre}%`]
            );
            return result;
        } catch (error) {
            throw new Error(`Error finding incidents by name: ${error.message}`);
        }
    }

    async getIncidentesPorTipo() {
        try {
            const result = await this.query(
                `SELECT nombre, COUNT(*) as cantidad
                 FROM "INCIDENCIA"
                 GROUP BY nombre
                 ORDER BY cantidad DESC`
            );
            return result;
        } catch (error) {
            throw new Error(`Error getting incident statistics: ${error.message}`);
        }
    }
}

module.exports = new Incidencia(); 