const express = require('express');
const bodyParser = require('body-parser');

const HttpError = require("./Models/http-error");

const usersRoutes = require('./routes/users-routes');

const app = express();

app.use(bodyParser.json());



app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
    const error = new HttpError('No se encontro esta ruta', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'Error desconocido'})
});

app.listen(5000)
