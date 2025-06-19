const sql = require('../config/db.config');

class BaseModel {
    constructor(tableName, fields, primaryKey = 'id') {
        this.tableName = tableName;
        this.fields = fields;
        this.primaryKey = primaryKey;
    }

    async findAll() {
        try {
            return await sql`
                SELECT * FROM ${sql(this.tableName)}
            `;
        } catch (error) {
            throw new Error(`Error fetching ${this.tableName}: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const result = await sql`
                SELECT * FROM "${sql(this.tableName)}"
                WHERE "${sql(this.primaryKey)}" = ${id}
            `;
            return result[0];
        } catch (error) {
            throw new Error(`Error fetching ${this.tableName} by id: ${error.message}`);
        }
    }

    async create(data) {
        try {
            const fields = Object.keys(data).filter(key => this.fields.includes(key));
            const values = fields.map(field => data[field]);
            
            const query = sql`
                INSERT INTO "${sql(this.tableName)}" ${sql(fields)}
                VALUES ${sql(values)}
                RETURNING *
            `;
            
            const result = await query;
            return result[0];
        } catch (error) {
            throw new Error(`Error creating ${this.tableName}: ${error.message}`);
        }
    }

    async update(id, data) {
        try {
            const fields = Object.keys(data).filter(key => this.fields.includes(key));
            const updates = fields.reduce((acc, field) => {
                acc[field] = data[field];
                return acc;
            }, {});

            const result = await sql`
                UPDATE "${sql(this.tableName)}"
                SET ${sql(updates)}
                WHERE "${sql(this.primaryKey)}" = ${id}
                RETURNING *
            `;
            return result[0];
        } catch (error) {
            throw new Error(`Error updating ${this.tableName}: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const result = await sql`
                DELETE FROM "${sql(this.tableName)}"
                WHERE "${sql(this.primaryKey)}" = ${id}
                RETURNING *
            `;
            return result[0];
        } catch (error) {
            throw new Error(`Error deleting ${this.tableName}: ${error.message}`);
        }
    }

    async query(rawQuery, params = []) {
        try {
            // Convertir la consulta SQL tradicional a template literal
            const queryString = rawQuery.replace(/\$\d+/g, '?');
            return await sql.unsafe(queryString, params);
        } catch (error) {
            throw new Error(`Error executing query on ${this.tableName}: ${error.message}`);
        }
    }
}

module.exports = BaseModel; 