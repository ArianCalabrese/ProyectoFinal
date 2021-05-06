const express = require("express");
const { check } = require("express-validator");
const HttpError = require("../Models/http-error");
const postsControllers = require("../Controllers/posts-controllers");
const checkAuth = require('../Middleware/check-auth');

const router = express.Router();

router.get("/", postsControllers.getPosts);

router.get("/:pid", postsControllers.getPostById);

router.get("/user/:uid", postsControllers.getPostsByUserId);

router.get("/categoria/:categoria", postsControllers.getPostsByCategory);

router.use(checkAuth);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("categoria").not().isEmpty(),
  ],
  postsControllers.createPost
);

router.patch("/:pid", postsControllers.updatePostById);

router.delete("/:pid", postsControllers.deletePostById);

module.exports = router;
