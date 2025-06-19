require('dotenv').config();
const postgres = require('postgres');

const sql = postgres({
  host: 'aws-0-us-east-1.pooler.supabase.com',
  port: 5432,
  database: 'postgres',
  username: 'postgres.dnxfiwehncodmckvfujd',
  password: 'Ab3L_Al1ci@_Riv3er0',
  ssl: 'require',
  connection: {
    options: `--cluster=pooler-connection-mode=session`,
  },
  // Configuración de pool
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

module.exports = sql; 