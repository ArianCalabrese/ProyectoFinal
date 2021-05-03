const { uuid } = require('uuidv4');
const { validationResult } = require("express-validator");
const HttpError = require("../Models/http-error");

const DUMMY_USERS = [
    {
        id: "ul",
        name:"Max",
        email:"algo@algo.com",
        password:"testpass",
        ciudad:"La Plata"
    },
    {
        id: "uk",
        name:"Maxer",
        email:"algo2@algo.com",
        password:"testpass2",
        ciudad:"La Plata"
    },
    {
        id: "uw",
        name:"Shino",
        email:"alg223o2@algo.com",
        password:"testpass2",
        ciudad:"Avellaneda"
    }
]; 


//Devuelve la lista de todos los usuarios /api/users
const getUsers = (req, res, next) => {
    res.json({ users: DUMMY_USERS});
};

//Devuelve los usuarios de una ciodad, /api/users/ciudad/{ciudad}
const getUsersByCiudad = (req, res, next) => {
    const ciudad = req.params.ciudad;
    const usuarios = DUMMY_USERS.filter((u) => {
        return u.ciudad === ciudad;
    })
    if(!usuarios || usuarios.length === 0){
        return next(new HttpError('Ningun usuario de esa ciudad', 404));
    };
    res.json({ usuarios});
};

//Registrar usuario, nombre, email, password y ciudad son requeridos
// /api/users/signup
const signup = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new HttpError('Datos erroneos', 422));
    }
    const { name, email, password, ciudad} = req.body;

    const usuarioExiste = DUMMY_USERS.find(u => u.email === email);

    if (usuarioExiste){
        return next(new HttpError('Ya existe un usuario con ese email', 422));
    }

    const createdUser = {
        id: uuid(),
        name: name,
        email: email,
        password: password,
        ciudad: ciudad
    };

    DUMMY_USERS.push(createdUser);

    res.status(201).json({ user: createdUser });

};

//Permite loguearse con usuario y contraseña /api/users/login
const login = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new HttpError('Datos erroneos', 422));
    }
    
    const { email, password} = req.body;

    const identifiedUser = DUMMY_USERS.find(u => u.email === email);

    if (!identifiedUser || identifiedUser.password !== password){
        return next(new HttpError(' No se encontro el usuario, o los datos son equivocados', 401));
    }
     res.json({message: ' logueado'});
};

exports.getUsers = getUsers;
exports.getUsersByCiudad = getUsersByCiudad;
exports.singup = signup;
exports.login = login;