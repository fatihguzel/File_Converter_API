const express = require("express"); // express modülü (server için)
const ErrorHandler = require("../error/ErrorHandler"); // error handler
const { authRouter } = require("./auth.router"); // auth router

const indexRouter = express.Router(); // index router

indexRouter.use("/auth", authRouter); // auth router
indexRouter.use(ErrorHandler); // error handler

module.exports.indexRouter = indexRouter; // index router
