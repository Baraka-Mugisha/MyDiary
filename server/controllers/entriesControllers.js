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

  }
};

export default entryController;