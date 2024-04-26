const bcrypt = require("bcryptjs");
const generateHashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

module.exports = generateHashPassword;
