const { uuid } = require('uuidv4');
const { validationResult } = require("express-validator");
const HttpError = require("../Models/http-error");

const DUMMY_USERS = [
    {
        id: "ul",
        name:"Max",
        email:"algo@algo.com",
        password:"testpass"
    },
    {
        id: "uk",
        name:"Maxer",
        email:"algo2@algo.com",
        password:"testpass2"
    }
]; 



const getUsers = (req, res, next) => {
    res.json({ users: DUMMY_USERS});
};

const signup = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new HttpError('Datos erroneos', 422));
    }
    const { name, email, password} = req.body;

    const usuarioExiste = DUMMY_USERS.find(u => u.email === email);

    if (usuarioExiste){
        return next(new HttpError('Ya existe ese usuario', 422));
    }

    const createdUser = {
        id: uuid(),
        name: name,
        email: email,
        password: password
    };

    DUMMY_USERS.push(createdUser);

    res.status(201).json({ user: createdUser });

};

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
exports.singup = signup;
exports.login = login;