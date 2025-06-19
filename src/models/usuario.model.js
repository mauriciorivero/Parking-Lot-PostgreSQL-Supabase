const BaseModel = require('./base.model');
const bcrypt = require('bcryptjs');

class Usuario extends BaseModel {
    constructor() {
        super('USUARIO', [
            'tipo_documento',
            'numero_documento',
            'primer_nombre',
            'segundo_nombre',
            'primer_apellido',
            'segundo_apellido',
            'direccion_correo',
            'numero_celular',
            'foto_perfil',
            'estado',
            'clave',
            'PERFIL_USUARIO_id'
        ], 'id_usuario');
    }

    async create(data) {
        if (data.clave) {
            data.clave = await bcrypt.hash(data.clave, 10);
        }
        return super.create(data);
    }

    async findByEmail(email) {
        try {
            const result = await this.query(
                'SELECT * FROM "USUARIO" WHERE direccion_correo = $1',
                [email]
            );
            return result[0];
        } catch (error) {
            throw new Error(`Error finding user by email: ${error.message}`);
        }
    }

    async findByDocumento(tipo, numero) {
        try {
            const result = await this.query(
                'SELECT * FROM "USUARIO" WHERE tipo_documento = $1 AND numero_documento = $2',
                [tipo, numero]
            );
            return result[0];
        } catch (error) {
            throw new Error(`Error finding user by documento: ${error.message}`);
        }
    }

    async validatePassword(plainPassword, hashedPassword) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }

    async findWithProfile(userId) {
        try {
            const result = await this.query(
                `SELECT u.*, p.perfil 
                 FROM "USUARIO" u 
                 JOIN "PERFIL_USUARIO" p ON u.PERFIL_USUARIO_id = p.id 
                 WHERE u.id_usuario = $1`,
                [userId]
            );
            return result[0];
        } catch (error) {
            throw new Error(`Error finding user with profile: ${error.message}`);
        }
    }
}

module.exports = new Usuario(); 