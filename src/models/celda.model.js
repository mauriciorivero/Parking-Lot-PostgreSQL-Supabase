const BaseModel = require('./base.model');

class Celda extends BaseModel {
    constructor() {
        super('CELDA', [
            'tipo',
            'estado'
        ]);
    }

    async findDisponibles(tipo) {
        try {
            const result = await this.query(
                'SELECT * FROM "CELDA" WHERE tipo = $1 AND estado = $2',
                [tipo, 'Libre']
            );
            return result;
        } catch (error) {
            throw new Error(`Error finding available cells: ${error.message}`);
        }
    }

    async ocuparCelda(celdaId) {
        try {
            const result = await this.query(
                'UPDATE "CELDA" SET estado = $1 WHERE id = $2 RETURNING *',
                ['Ocupado', celdaId]
            );
            return result[0];
        } catch (error) {
            throw new Error(`Error occupying cell: ${error.message}`);
        }
    }

    async liberarCelda(celdaId) {
        try {
            const result = await this.query(
                'UPDATE "CELDA" SET estado = $1 WHERE id = $2 RETURNING *',
                ['Libre', celdaId]
            );
            return result[0];
        } catch (error) {
            throw new Error(`Error freeing cell: ${error.message}`);
        }
    }

    async contarDisponibles() {
        try {
            const result = await this.query(
                `SELECT tipo, COUNT(*) as disponibles 
                 FROM "CELDA" 
                 WHERE estado = 'Libre' 
                 GROUP BY tipo`
            );
            return result;
        } catch (error) {
            throw new Error(`Error counting available cells: ${error.message}`);
        }
    }
}

module.exports = new Celda(); 