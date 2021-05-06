const { uuid } = require("uuidv4");
const { validationResult } = require("express-validator");
const HttpError = require("../Models/http-error");

const User = require("../Models/user");



//Listo
//Devuelve la lista de todos los usuarios /api/users
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    console.log(err);
    const error = new HttpError("No se encontron usuarios", 500);
    return next(error);
  }
  if (!users || users.length === 0) {
    const error = new HttpError(
      "No se encontro ningun usuario en la base de datos",
      404
    );
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

//Listo
//Devuelve los usuarios de una ciodad, /api/users/ciudad/{ciudad}
const getUsersByCiudad = async (req, res, next) => {
  const ciudad = req.params.ciudad;
  let users;
  try {
    users = await User.find({ ciudad: ciudad });
  } catch (err) {
    console.log(err);
    const error = new HttpError("No se encontron usuario de esa ciudad", 500);
    return next(error);
  }

  if (!users || users.length === 0) {
    const error = new HttpError(
      "No se encontro ningun usuario de esa ciudad",
      404
    );
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

//Listo
//Registrar usuario, nombre, email, password y ciudad son requeridos
// /api/users/signup
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Datos erroneos", 422));
  }
  const { name, email, password, ciudad } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Hubo un problema creando usuario", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("Ya existe un usuario con  ese mail", 422);
    return next(error);
  }
  const createdUser = new User({
    name: name,
    email: email,
    password: password,
    imagen:
      "https://upload.wikimedia.org/wikipedia/commons/a/a3/Dainikeihin_at_Shirokanetakanawa.jpg",
    ciudad: ciudad,
    posts: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Falla al crear el usuario", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

//Listo
//Permite loguearse con usuario y contraseña /api/users/login
const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Datos erroneos", 422));
  }

  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Hubo un problema en el servidor", 500);
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      "No existe el usuario o los datos son incorrectos",
      422
    );
    return next(error);
  }

  res.json({ message: " logueado" });
};

exports.getUsers = getUsers;
exports.getUsersByCiudad = getUsersByCiudad;
exports.singup = signup;
exports.login = login;
