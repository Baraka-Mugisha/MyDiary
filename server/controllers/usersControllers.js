import Joi from 'joi';
import userModel from '../Models/userModel';
import tokens from '../helpers/tokens';
import bcryptPwd from '../helpers/bcryptPwd';
import { schema } from '../middlewares/validation';
import response from '../helpers/Returns';
import displayMessage from '../helpers/displayMessages';
import statusCode from '../helpers/statusMessages';

export const userController = {
	signUp(req, res) {
		// check sign up details if valid with joi

		let {
			email, firstName, lastName, password
		} = req.body;
		const result = Joi.validate({
			email, firstName, lastName, password
		}, schema.user_sign_up);
		if (result.error) {
			return response.Validation(res, statusCode.BadRequest, result);
		}

		// check if the user exists
		const user = userModel.find((user) => user.email === email);
		if (user) {
			return res.status(409).json({ status: 409, error: 'The user with that email already exists' });
		}

		const id = userModel.length + 1;
		const payload = {
			id, firstName, lastName, email
		};

		// hash the password and generate token
		const token = tokens.getToken(payload);
		password = bcryptPwd.hashThePassword(password);

		const newUser = {
			id, email, password, firstName, lastName, token
		};
		userModel.push(newUser);
		
		return res.status(201).json({
			status: 201,
			message: "The User was created successfully",
			data: { token, id, firstName, lastName, email }
		})
	},
	signIn(req, res) {
		// check if the required sign in data are full
		let { email, password } = req.body;
		let result = Joi.validate({ email, password }, schema.user_sign_in);
		if (result.error) {
			return response.Validation(res, statusCode.BadRequest, result);
		};
		const user = userModel.find(user => user.email === email);

		// const user = userModel.find((user) => user.email == tokens.decoded(req, res).email);

		if (!user) { return res.status(404).json({ status: 404, error: 'There is no such user with that email' }); }
		if (!userModel.find(user => bcryptPwd.checkThepassword(password, user.password))) { return res.status(401).json({ status: 401, error: 'enter the correct password' }); }
		const { token } = user;

		return res.status(200).json({
			status: 200,
			message: 'User found',
			data: { token }, // should not include  id, firstName, lastName, email,
		});
	},
};
