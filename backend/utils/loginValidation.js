const loginValidation = ({ email, password }) => {
  const error = {};

  if (!email) {
    error.email = "Email is Required!!";
  }

  if (!password) {
    error.password = "Password is Required!!";
  }

  return error;
};

module.exports = loginValidation;
