const create = {
  usersTable: `
  DROP TABLE IF EXISTS users cascade;
  CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY UNIQUE,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`,
  entriesTable: `
  DROP TABLE IF EXISTS entries cascade;
  CREATE TABLE IF NOT EXISTS entries(
    id serial PRIMARY KEY UNIQUE,
    email TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    created_on TIMESTAMP DEFAULT NOW()
  )`
};

const deleteTables = ` 
    DROP TABLE IF EXISTS users cascade;
    DROP TABLE IF EXISTS entries cascade;
    `;
export default { create, deleteTables };
