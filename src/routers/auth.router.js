const express = require("express"); // express modülü (server için)
const AuthController = require("../controllers/auth.controller"); // auth controller

const authRouter = express.Router(); // auth router

authRouter.route("/login").post(AuthController.login); // login endpoint

module.exports.authRouter = authRouter; // auth router
