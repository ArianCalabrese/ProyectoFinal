const express = require("express");
const { check } = require("express-validator");
const HttpError = require("../Models/http-error");
const postsControllers = require("../Controllers/posts-controllers");
const checkAuth = require("../Middleware/check-auth");
const fileUpload = require("../Middleware/file-upload");

const router = express.Router();

router.get("/", postsControllers.getPosts);

router.get("/donaciones/recibidas/:uid", postsControllers.getDonationsByUserId);

router.get(
  "/donaciones/realizadas/:uid",
  postsControllers.getDonationsRealizadasByUserId
);

router.get("/donaciones", postsControllers.getDonations);

router.get("/:pid", postsControllers.getPostById);

router.get("/user/:uid", postsControllers.getPostsByUserId);

router.get("/categoria/:categoria", postsControllers.getPostsByCategory);

router.get("/ciudad/:ciudad", postsControllers.getPostsByCiudad);

router.post("/:pid/donaciones", postsControllers.setDonation);

router.get(
  "/buscar/:categoria/:ciudad",
  postsControllers.getPostsByCategoriaCiudad
);

//router.use(checkAuth);

router.post("/agregar", postsControllers.createPost);
// router.post(
//   "/agregar",
//   fileUpload.single('image'),
//   [
//     check("title").not().isEmpty(),
//     check("description").isLength({ min: 5 }),
//     check("categoria").not().isEmpty(),
//   ],
//   postsControllers.createPost
// );

router.patch(
  "/:pid",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("ciudad").not().isEmpty(),
    check("categoria").not().isEmpty(),
  ],
  postsControllers.updatePostById
);

router.delete("/:pid", postsControllers.deletePostById);

module.exports = router;
