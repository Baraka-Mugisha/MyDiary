import userModel from '../Models/userModel';
import tokens from '../helpers/tokens';
import bcryptPwd from '../helpers/bcryptPwd';
import dispMessages from '../helpers/displayMessages';
import status from '../helpers/statusMessages';
import ReturnIt from '../helpers/returnIt';

export const userController = {
	signUp(req, res) {
		let {
			email, firstName, lastName, password
		} = req.body;

		const user = userModel.find((user) => user.email === email);
		if (user) {
			return ReturnIt.Error(res, 409, dispMessages.emailExists );
		}
		const id = userModel.length + 1;
		const payload = {
			id, firstName, lastName, email
		};

		const token = tokens.getToken(payload);
		password = bcryptPwd.hashThePassword(password);

		const newUser = {
			id, email, password, firstName, lastName, token
		};
		userModel.push(newUser);		
		return ReturnIt.Success(res, 201,
			dispMessages.userCreated, { token })
	},
	signIn(req, res) {
		let { email, password } = req.body;
		const user = userModel.find(user => user.email === email);

		if (!user) { return ReturnIt.Error(res, 404, dispMessages.userNotFound)}

		if (!userModel.find(user => bcryptPwd.checkThepassword(password, user.password))) { return ReturnIt.Error(res, 401, dispMessages.pwdIncorrect); }

		const { token } = user;

		return ReturnIt.Success(res, 200, dispMessages.userFound, { token }, 
		);
	}
};
