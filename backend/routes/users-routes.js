const express = require("express");
const { check } = require("express-validator");
const HttpError = require("../Models/http-error");

const usersControllers = require("../Controllers/users-controllers");
const fileUpload = require('../Middleware/file-upload');

const router = express.Router();

router.get("/", usersControllers.getUsers);

router.get("/ciudad/:ciudad", usersControllers.getUsersByCiudad);

router.post(
  "/signup",
  fileUpload.single('image'),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersControllers.singup
);

router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").not().isEmpty(),
  ],
  usersControllers.login
);

module.exports = router;
