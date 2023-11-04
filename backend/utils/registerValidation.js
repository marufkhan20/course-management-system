const registerValidation = ({ email, number, password }) => {
  const error = {};

  if (!email) {
    error.email = "Email is Required!!";
  }

  if (!number) {
    error.number = "Number is Required!!";
  }

  if (!password) {
    error.password = "Password is Required!!";
  }

  return error;
};

module.exports = registerValidation;
