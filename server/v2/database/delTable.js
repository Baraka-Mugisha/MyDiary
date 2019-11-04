import { Pool } from 'pg';
import dotenv from 'dotenv';
import { deleteTables } from './queries';

dotenv.config();

const config = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
};

const pool = new Pool(config);
pool.query(deleteTables, (error, res) => {
  if (error) {
    console.log(`error: ${error}`);
  } else {
    console.log('deleted');
    console.table(res.rows);
  }
  pool.end();
});
pool.connect();
