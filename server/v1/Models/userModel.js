import bcryptPwd from '../../helpers/bcryptPwd';
import tokens from '../../helpers/tokens';

const users = [];

users.push({
	id: 1,
	email: 'baraka@gmail.com',
	firstName: 'baraka',
	lastName: 'jean',
	password: bcryptPwd.hashThePassword('mypassword'),
	token: tokens.getToken({
		id: 1,
		firstName: 'baraka',
		lastName: 'jean',
		email: 'baraka@gmail.com',
	}),
}, {
	id: 2,
	email: 'jean@gmail.com',
	firstName: 'jean',
	lastName: 'pierre',
	password: bcryptPwd.hashThePassword('adminpass'),
	token: tokens.getToken({
		id: 2,
		email: 'jean@gmail.com',
		firstName: 'jean',
		lastName: 'pierre',
	}),
});

export default users;
