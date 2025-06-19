const BaseModel = require('./base.model');

class PerfilUsuario extends BaseModel {
    constructor() {
        super('PERFIL_USUARIO', ['perfil']);
    }

    // Métodos específicos para PerfilUsuario
    async findByPerfil(perfil) {
        try {
            const result = await this.query(
                'SELECT * FROM "PERFIL_USUARIO" WHERE perfil = $1',
                [perfil]
            );
            return result[0];
        } catch (error) {
            throw new Error(`Error finding profile by perfil: ${error.message}`);
        }
    }
}

module.exports = new PerfilUsuario(); 