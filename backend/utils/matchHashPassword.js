const bcrypt = require("bcryptjs");

const matchHashPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash); 
};

module.exports = matchHashPassword;