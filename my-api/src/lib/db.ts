import { Pool } from 'pg';

// Configuración de conexión con PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,           // Usuario de la base de datos
  host: process.env.DB_HOST,           // Host (localhost si está local)
  database: process.env.DB_NAME,       // Nombre de la base de datos
  password: process.env.DB_PASSWORD,   // Contraseña
  port: Number(process.env.DB_PORT),   // Puerto de conexión
});

// Función para ejecutar consultas
export const query = async (text: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } catch (err) {
    console.error('Error ejecutando la consulta:', err);
    throw err;
  } finally {
    client.release();
  }
};
