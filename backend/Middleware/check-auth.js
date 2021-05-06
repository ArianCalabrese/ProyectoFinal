const jwt = require("jsonwebtoken");

const HttpError = require("../Models/http-error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new HttpError("Fallo la autenticacion");
    }
    const decodedToken = jwt.verify(token, "private_key_proyecto2021");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError("Fallo la autenticacion!!!", 401);
    return next(error);
  }
};
