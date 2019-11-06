import tokens from '../helpers/tokens';
import bcryptPwd from '../helpers/bcryptPwd';
import dispMessages from '../helpers/displayMessages';
import status from '../helpers/statusMessages';
import ReturnIt from '../helpers/returnIt';
import pool from '../database/dbConnect';

export const userController = {
  async signUp(req, res) {
    const {
      email, firstName, lastName, password
    } = req.body;

    const exist = await pool.query('SELECT * FROM users WHERE email = $1;', [email]);

    const hashedPassword = bcryptPwd.hashThePassword(password);
    try {
      const result = await pool.query('INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *;', [firstName, lastName, email, hashedPassword]);

      return ReturnIt.Success(res, 201,
        dispMessages.userCreated, { token: tokens.getToken(result.rows[0]) });
    } catch (error) {
      if (exist.rows[0]) {
        return ReturnIt.Error(res, 409, dispMessages.emailExists);
      }
      return ReturnIt.Error(res, 500, 'SERVER ERROR');
    }
  },
  async signIn(req, res) {
    const { email, password } = req.body;
    let user;
    try {
      user = await pool.query('SELECT * FROM users WHERE email = $1;', [email]);
    } catch (error) { return res.status(500).json({ status: 500, error: 'SERVER ERROR' }); }

    if (!user.rows[0]) { return ReturnIt.Error(res, 404, dispMessages.userNotFound); }

    if (!bcryptPwd.checkThepassword(password, user.rows[0].password)) { return ReturnIt.Error(res, 401, dispMessages.pwdIncorrect); }

    return ReturnIt.Success(res, 200, dispMessages.userFound, { token: tokens.getToken(user.rows[0]) });
  }
};
