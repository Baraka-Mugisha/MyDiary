import bcrypt from 'bcrypt';

const hashThePassword = (password) => {
  const salt = bcrypt.genSaltSync(12);
  return bcrypt.hashSync(password, salt);
};

const checkThepassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword);

export default { hashThePassword, checkThepassword };
