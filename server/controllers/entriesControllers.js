import uid from 'uid';
import Joi from 'joi';
import database from '../data/data';
import tokens from '../helpers/tokens';
import { schema } from '../middlewares/validation';

const entryController = {
  createEntry(req, res) {
    const user = database.users.find(user => user.email == tokens.decoded(req, res).email);
    const { title, description } = req.body;

    if (!user) { return res.status(401).json({ status: 401, message: "You are not authorised for this operation. Sign in first." }) };

    const result = Joi.validate({ title, description }, schema.entries);
    if (result.error) {
      return res.status(400).json({ status: 400, error: `${result.error.details[0].message.split('\"').join('')}` });
    };
    const date = new Date();

    // if the user exists
    let newEntry = {
      user_email: user.email,
      id: database.entries.length + 1,
      createdOn: `${date.getHours()}:${date.getMinutes()}, ${date.toDateString()}`,
      title: req.body.title,
      description: req.body.description,
    };

    database.entries.push(newEntry);
    let entryDisp = { ...newEntry };
    delete entryDisp['user_email'];
    return res.status(201).json({ status: 201, message: "success", data: entryDisp });

  },
  viewEntries(req, res) {
    const user = database.users.find(user => user.email == tokens.decoded(req, res).email);
    const entryFound = database.entries.filter(entry => entry.user_email == tokens.decoded(req, res).email);

    if (user) {

    //view entries sorted in descending
      return entryFound.length !== 0 ?
        res.status(200).json({
          status: 200, message: "success",data: entryFound.sort((a,b) => b.id - a.id
        )}) : res.status(404).json({ status: 404, error: "You have not yet created an entry" })
    }
    return res.status(401).json({ status: 401, message: "You are not authorised for this operation. Sign in first." });
  },
  viewSpecificEntry(req, res) {
    const user = database.users.find(user => user.email == tokens.decoded(req, res).email);
    const id = req.params.entry_id;
    const entry = database.entries.find(entry => entry.id === parseInt(id, 10));
    if (user) {
      if (!entry) { return res.status(404).json({ status: 404, message: "the  entry was not found" }) };
      const entryFound = user.email == entry.user_email;
      return entryFound ? res.status(200).json({
        status: 200,
        message: "success",
        data: entry
      }) : res.status(401).json({
        status: 401,
        error: "You are unauthorised to access this entry"
      });
    }
    return res.status(401).json({ status: 401, message: "You are not authorised for this operation. Sign in first." });
  },
};

export default entryController;