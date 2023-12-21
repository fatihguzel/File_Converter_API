/**
 * @description Login service
 * @method loginService
 * @param {string} email email
 * @param {string} password password
 * @returns {Object} response
 */
const loginService = async (email, password) => {
  return {
    message: "Login success",
  };
};

module.exports = {
  loginService,
};
