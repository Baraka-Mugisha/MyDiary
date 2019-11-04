import { Pool } from 'pg';
import dotenv from 'dotenv';
import createTables from './queries';

dotenv.config();
let connectionString;
if (process.env.NODE_ENV === 'testing') {
  connectionString = process.env.TESTDATABASE_URL;
} else {
  connectionString = process.env.DATABASE_URL;
}
const pool = new Pool({ connectionString });
pool.connect(async () => {
  try {
    await pool.query(createTables);
    console.log('connected...', process.env.NODE_ENV);
  } catch (err) {
    console.log(err);
  }
});

export default pool;
