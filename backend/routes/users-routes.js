const express = require("express");
const { check } = require("express-validator");
const HttpError = require("../Models/http-error");

const usersControllers = require('../Controllers/users-controllers');

const router = express.Router();


router.get("/", usersControllers.getUsers);

router.get('/ciudad/:ciudad', usersControllers.getUsersByCiudad);

router.post("/signup",
[
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({min: 6}),
    check("ciudad").not().isEmpty()
]
, usersControllers.singup);

router.post("/login",
[
    check("email").normalizeEmail().isEmail(),
    check("password").not().isEmpty()
]
 ,usersControllers.login);

module.exports = router;

