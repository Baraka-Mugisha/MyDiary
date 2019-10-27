import Joi from 'joi';
import database from '../data/data';
import tokens from '../helpers/tokens';
import bcryptPwd from '../helpers/bcryptPwd';
import { schema } from '../middlewares/validation';

export const userController = {
  signUp(req, res) {
    //check sign up details if valid with joi

    let { email, firstName, lastName, password } = req.body;
    let result = Joi.validate({ email, firstName, lastName, password }, schema.user_sign_up);
    if (result.error) {
      return res.status(400).json({ status: 400, error: `${result.error.details[0].message.split('\"').join('')}` });
    };

    // check if the user exists
    let user = database.users.find(user => user.email === email);
    if (user) {
      return res.status(409).json({ status: 409, error: 'The user with that email already exists' });
    };

    let id = database.users.length + 1;
    let payload = { id, firstName, lastName, email };

    // hash the password and generate token
    let token = tokens.getToken(payload);
    password = bcryptPwd.hashThePassword(password);

    let newUser = { id, email, password, firstName, lastName, token };
    database.users.push(newUser);

    return res.status(201).json({
      status: 201,
      message: "The User was created successfully",
      data: { token, id, firstName, lastName, email }
    })
  },
  signIn(req, res) {
    //check if the required sign in data are full
    let { email, password } = req.body;
    let result = Joi.validate({ email, password }, schema.user_sign_in);
    if (result.error) {
      return res.status(400).json({ status: 400, error: `${result.error.details[0].message.split('\"').join('')}` });
    };

    // check if the user exists
    const user = database.users.find(user => user.email === email);

    if (!user) { return res.status(404).json({ status: 404, error: 'There is no such user with that email' }); }
    if (!database.users.find(user => bcryptPwd.checkThepassword(password, user.password))) { return res.status(401).json({ status: 401, error: 'enter the correct password' }); }

    const { id, firstName, lastName, token } = user;

    return res.status(200).json({
      status: 200,
      message: "User found",
      data: { token, id, firstName, lastName, email },  // should include  id, firstName, lastName, email,
    });
  },
}

