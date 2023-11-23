const express = require("express");
const { createUser, loginUser, getUser } = require("../controllers/authController");
const auth = require("../middleware/jwt");
const authRotas = express.Router();

authRotas.post("/signup", createUser);
authRotas.post("/signin", loginUser);
authRotas.get("/", auth, getUser);

module.exports = authRotas;