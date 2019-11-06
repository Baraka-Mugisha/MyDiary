import tokens from '../helpers/tokens';
import ReturnIt from '../helpers/returnIt';
import dispMessages from '../helpers/displayMessages';
import pool from '../database/dbConnect';

const entryController = {
  async createEntry(req, res) {
    let newEntry;
    const { title, description } = req.body;
    let user;
    try {
      user = await pool.query('SELECT * FROM users WHERE email = $1;', [tokens.decoded(req, res).email]);
    } catch (error) {
      return ReturnIt.Error(res, 500, 'SERVER ERROR');
    }

    if (user.rows[0]) {
      try { newEntry = await pool.query('INSERT INTO entries (email, title, description) VALUES($1, $2, $3) RETURNING *;', [user.rows[0].email, title, description]); } catch (error) {
        return ReturnIt.Error(res, 500, 'SERVER ERROR');
      }
      const entryDisp = { ...newEntry.rows[0] };
      delete entryDisp.email;
      return ReturnIt.Success(res, 201, dispMessages.success, entryDisp);
    }
    return ReturnIt.Message(res, 401, dispMessages.signInFirst);
  },
  async viewEntries(req, res) {
    let user;
    let entryFound;
    try {
      user = await pool.query('SELECT * FROM users WHERE email = $1;', [tokens.decoded(req, res).email]);
      entryFound = await pool.query('SELECT * FROM entries WHERE email = $1;', [tokens.decoded(req, res).email]);
    } catch (error) {
      return ReturnIt.Error(res, 500, 'SERVER ERROR');
    }
    const entry = entryFound.rows.sort((a, b) => b.id - a.id);

    if (user.rows[0]) {
      return entry.length !== 0 ? ReturnIt.Success(res, 200, dispMessages.success, entry) : ReturnIt.Error(res, 404, dispMessages.emptyEntry);
    }
    return ReturnIt.Message(res, 401, dispMessages.signInFirst);
  },
};

export default entryController;
