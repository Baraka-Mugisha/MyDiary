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

const table = {
  insertUsers: 'INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *;',
  selectUsers: 'SELECT * FROM users WHERE email = $1;',
  insertEntries: 'INSERT INTO entries (email, title, description) VALUES($1, $2, $3) RETURNING *;',
  selectEntriesEmail: 'SELECT * FROM entries WHERE email = $1;',
  selectEntriesId: 'SELECT * FROM entries WHERE id = $1;',
  updateEntries: 'UPDATE entries SET title = $1, description = $2 WHERE id = $3 RETURNING *;',
  deleteEntries: 'DELETE FROM entries WHERE id = $1;',
  deleteTables: ` 
    DROP TABLE IF EXISTS users cascade;
    DROP TABLE IF EXISTS entries cascade;
    `,
};

export default { create, table };
