import tokens from '../../helpers/tokens';
import ReturnIt from '../../helpers/returnIt';
import dispMessages from '../../helpers/displayMessages';
import pool from '../database/dbConnect';
import queries from '../database/queries';

const entryController = {
  async createEntry(req, res) {
    let newEntry;
const { title, description } = req.body;
let user;
    try {
      user = await pool.query(queries.table.selectUsers, [tokens.decoded(req, res).email]);
    } catch (error) {
      return ReturnIt.Error(res, 500, 'SERVER ERROR');
    }

    if (user.rows[0]) {
      try { newEntry = await pool.query(queries.table.insertEntries, [user.rows[0].email, title, description]); } catch (error) {
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
      user = await pool.query(queries.table.selectUsers, [tokens.decoded(req, res).email]);
      entryFound = await pool.query(queries.table.selectEntriesEmail, [tokens.decoded(req, res).email]);
    } catch (error) {
      return ReturnIt.Error(res, 500, 'SERVER ERROR');
    }
    const entry = entryFound.rows.sort((a, b) => b.id - a.id);

    if (user.rows[0]) {
      return entry.length !== 0 ? ReturnIt.Success(res, 200, dispMessages.success, entry) : ReturnIt.Error(res, 404, dispMessages.emptyEntry);
    }
    return ReturnIt.Message(res, 401, dispMessages.signInFirst);
  },
  async viewSpecificEntry(req, res) {
    let entry;
    let user;
    const id = req.params.entry_id;
    try {
      user = await pool.query(queries.table.selectUsers, [tokens.decoded(req, res).email]);
      entry = await pool.query(queries.table.selectEntriesId, [id]);
    } catch (error) {
      return ReturnIt.Error(res, 500, 'SERVER ERROR');
    }
    if (user.rows[0]) {
      if (!entry.rows[0]) {
        return ReturnIt.Message(res, 404, dispMessages.entryNotFound);
      }
      const entryFound = user.rows[0].email === entry.rows[0].email;
      return entryFound ? ReturnIt.Success(res, 200, dispMessages.success, entry.rows[0])
        : ReturnIt.Error(res, 401, dispMessages.entryNotYours);
    }
    return ReturnIt.Message(res, 401, dispMessages.signInFirst);
  },
  async modifyEntry(req, res) {
    const id = req.params.entry_id;
    const { title, description } = req.body;
    let newEntry;
    let user;
    let entry;
    try {
      user = await pool.query(queries.table.selectUsers, [tokens.decoded(req, res).email]);
      entry = await pool.query(queries.table.selectEntriesId, [id]);
    } catch (error) {
      return ReturnIt.Error(res, 500, 'SERVER ERROR');
    }




console.log('My Diary Console');

var MyDiary;

    if (user.rows[0]) {
      if (!entry.rows[0]) { return ReturnIt.Error(res, 404, dispMessages.entryNotFound); }

      if (entry.rows[0].email === user.rows[0].email) {
        try {
          newEntry = await pool.query(queries.table.updateEntries, [title, description, id]);
        } catch (error) {
          return ReturnIt.Error(res, 500, 'SERVER ERROR');
        }
        return ReturnIt.Success(res, 200, dispMessages.entryEdited, { id, title, description });
      }
      return ReturnIt.Error(res, 401, dispMessages.editDenied);
    }
    return ReturnIt.Error(res, 401, dispMessages.signInFirst);
  },
  async deleteEntry(req, res) {
    const id = req.params.entry_id;
    let entry;
    let user;

    try {
      user = await pool.query(queries.table.selectUsers, [tokens.decoded(req, res).email]);
      entry = await pool.query(queries.table.selectEntriesId, [id]);
    } catch (error) {
      return ReturnIt.Error(res, 500, 'SERVER ERROR');
    }
    if (user.rows[0]) {
      if (!entry.rows[0]) { return ReturnIt.Message(res, 404, dispMessages.entryNotFound); }

      if (entry.rows[0].email === user.rows[0].email) {
        await pool.query(queries.table.deleteEntries, [id]);
        return ReturnIt.Message(res, 200, dispMessages.entryDeleted);
      }
      return ReturnIt.Error(res, 401, dispMessages.deleteDenied);
    }
    return ReturnIt.Error(res, 401, dispMessages.signInFirst);
  },
};

export default entryController;
