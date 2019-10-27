import bcryptPwd from '../helpers/bcryptPwd';
import tokens from'../helpers/tokens';
const users = [];
const entries = [];

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

entries.push({
  user_email: 'baraka@gmail.com',
  id: 1,
  createdOn: '1-1-2019',
  title: 'My First Title Kigali',
  description: 'Kigali is a wonderful place'
}, {
    user_email: 'jean@gmail.com',
    id: 2,
    createdOn: '1-1-2019',
    title: 'RAB 423',
    description: 'Kigali'
  })
export default { users, entries };