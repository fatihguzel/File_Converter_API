const expressAsyncHandler = require("express-async-handler");
const { loginService } = require("../services/auth.services");

// AuthController class'ı
/**
 * @description AuthController constructor
 * @method constructor
 * @memberof AuthController
 * @returns {void}
 */
class AuthController {
  constructor() {} // constructor

  /**
   * @description login
   * @method login
   * @memberof AuthController
   * @param {Object} req request
   * @param {Object} res response
   * @returns {Object} response
   */
  static login = expressAsyncHandler(async (req, res) => {
    console.info(`PATH: ${req.originalUrl}`); // request url'i
    console.info(`METHOD: ${req.method}`); // request method'u
    console.info(`BODY: ${JSON.stringify(req.body)}`); // request body

    const { email, password } = req.body; // request body
    const response = await loginService(email, password); // login service
    res.status(200).json(response); // response
  });
}

module.exports = AuthController;
