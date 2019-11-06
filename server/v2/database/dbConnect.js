import { Pool } from 'pg';
import dotenv from 'dotenv';
import queries from './queries';

dotenv.config();
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
pool.connect(async () => {
  try {
    await pool.query(`${queries.create.entriesTable}; ${queries.create.usersTable};`);
    process.stdout.write('connected...', process.env.NODE_ENV);
  } catch (err) {
    process.stdout.write(err);
  }
});

export default pool;
