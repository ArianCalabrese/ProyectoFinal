const fs = require("fs");
const { uuid } = require("uuidv4");
const { validationResult } = require("express-validator");
const HttpError = require("../Models/http-error");
const mongoose = require("mongoose");

const Post = require("../Models/post");
const User = require("../Models/user");
const Donation = require("../Models/donaciones");
const mongooseUniqueValidator = require("mongoose-unique-validator");

//Listo
//devuelve todos los posts /api/posts
const getPosts = async (req, res, next) => {
  let posts;
  try {
    posts = await Post.find();
  } catch (err) {
    console.log(err);
    const error = new HttpError("No se encontron posts", 500);
    return next(error);
  }
  if (!posts || posts.length === 0) {
    const error = new HttpError(
      "No se encontro ningun post en la base de datos",
      404
    );
    return next(error);
  }
  res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
};

//Listo
//Devuleve el post que coincide con el id /api/posts/{id}
const getPostById = async (req, res, next) => {
  const postId = req.params.pid;
  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    //console.log(err);
    const error = new HttpError("No se encontro el  post", 500);
    return next(error);
  }

  if (!post) {
    const error = new HttpError("No se encontro ningun post con ese id", 404);
    return next(error);
  }
  console.log(post);
  res.json({ post: post.toObject({ getters: true }) });
};

//Listo
//Devuleve los posts de un usuario /api/posts/user/{id}
const getPostsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let posts;
  try {
    posts = await Post.find({ creator: userId });
  } catch (err) {
    console.log(err);
    const error = new HttpError("No se encontron posts de ese usuario", 500);
    return next(error);
  }

  if (!posts || posts.length === 0) {
    res.json({ posts: [] });
  } else {
    res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
  }
};

//Listo
//Crea un post nuevo, titulo, descripcion y categoria son obligatorios
// /api/posts ( metodo POST)
const createPost = async (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Datos invalidos, chequea los datos", 422));
  }

  const { title, description, categoria, ciudad, creator, items } = req.body;
  const createdPost = new Post({
    title: title,
    description: description,
    categoria: categoria,
    ciudad: ciudad,
    image: req.body.image,
    creator: creator,
    items: items,
  });

  let user;
  try {
    user = await User.findById(req.body.creator);
  } catch (err) {
    console.log(err);
    const error = new HttpError("Fallo la creacion del post", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("No se encontro usuario con ese id", 404);
    return next(error);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdPost.save({ session: session });
    user.posts.push(createdPost);
    await user.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(err, 500);
    return next(error);
  }
  res.status(201).json({ post: createdPost.toObject({ getters: true }) });
};

//Listo
//Modifica datos del post por id, /api/posts/{id} (metodo PATCH)
const updatePostById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Datos invalidos", 422));
  }
  const { title, description, ciudad, categoria, creator } = req.body;
  const postId = req.params.pid;

  let post;
  try {
    post = await Post.findById(postId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Algo salio mal, no se pudo modificar el post",
      500
    );
    return next(error);
  }

  if (post.creator.id.toString() !== creator) {
    const error = new HttpError(
      creator + " y este es el string" + post.creator.toString(),
      401
    );
    return next(error);
  }

  if (title) {
    post.title = title;
  }
  if (description) {
    post.description = description;
  }
  if (ciudad) {
    post.ciudad = ciudad;
  }
  if (categoria) {
    post.categoria = categoria;
  }

  try {
    await post.save();
  } catch (err) {
    const error = new HttpError("No se pudo guardar el post modificado", 500);
    return next(error);
  }

  res.status(200).json({ post: post.toObject({ getters: true }) });
};

//Listo
//Borra un post por id, /api/posts/{id} (Metodo DELETE)
const deletePostById = async (req, res, next) => {
  const { creator } = req.body;
  const postId = req.params.pid;
  let post;
  try {
    post = await Post.findById(postId).populate("creator");
  } catch (err) {
    const error = new HttpError("No se encontro post con ese id", 500);
    return next(error);
  }

  if (!post) {
    const error = new HttpError("No se pudo encontrar post con ese id", 404);
    return next(error);
  }

  if (post.creator.id.toString() !== creator) {
    const error = new HttpError(
      post.creator.id.toString() + "este el el creador" + creator,
      401
    );
    return next(error);
  }

  const imagePath = post.image;

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await post.remove({ session: session });
    post.creator.posts.pull(post);
    await post.creator.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError("Error al intentar borrar el archivo", 500);
    return next(error);
  }

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });
  res.status(200).json({ message: "Post Borrado" });
};

//Listo
//Devuelve los post de una categoria /api/posts/categoria/{categoria}
const getPostsByCategory = async (req, res, next) => {
  const categoria = req.params.categoria;
  let posts;
  try {
    posts = await Post.find({ categoria: categoria });
  } catch (err) {
    console.log(err);
    const error = new HttpError("No se encontron posts de esa categoria", 500);
    return next(error);
  }

  if (!posts || posts.length === 0) {
    const error = new HttpError(
      "No se encontro ningun post de esa categoria",
      404
    );
    return next(error);
  }

  res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
};

const getPostsByCiudad = async (req, res, next) => {
  const ciudad = req.params.ciudad;
  let posts;
  try {
    posts = await Post.find({ ciudad: ciudad });
  } catch (err) {
    console.log(err);
    const error = new HttpError("No se encontron posts de esa ciudad", 500);
    return next(error);
  }

  if (!posts || posts.length === 0) {
    const error = new HttpError(
      "No se encontro ningun post de esa ciudad",
      404
    );
    return next(error);
  }

  res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
};

const getPostsByCategoriaCiudad = async (req, res, next) => {
  const ciudad = req.params.ciudad;
  const categoria = req.params.categoria;
  let posts;
  try {
    posts = await Post.find({ ciudad: ciudad, categoria: categoria });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "No se encontron posts con esa combinacion",
      500
    );
    return next(error);
  }

  if (!posts || posts.length === 0) {
    const error = new HttpError(
      "No se encontro ningun post con esa combinacion",
      404
    );
    return next(error);
  }

  res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
};

const setDonation = async (req, res, next) => {
  //console.log(req.body);
  const { items, donator, post_name, post_creator_id } = req.body;
  console.log(items);
  const postId = req.params.pid;
  console.log(postId);
  let post;
  try {
    post = await Post.updateOne(
      { _id: postId },
      {
        $set: {
          items: items,
        },
      }
    );
  } catch (err) {
    console.log(err);
    const error = new HttpError("Error", 500);
    return next(error);
  }

  if (!post) {
    const error = new HttpError("Error", 404);
    return next(error);
  }
  //donations
  const createdDonation = new Donation({
    post: postId,
    donator: donator,
    items: items,
    post_name: post_name,
    post_creator_id: post_creator_id,
  });
  try {
    await createdDonation.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Falla al crear la donacion", 500);
    return next(error);
  }
  res
    .status(200)
    .json({ donation: createdDonation.toObject({ getters: true }) });
};

const getDonationsByUserId = async (req, res, next) => {
  const donator = req.params.uid;

  let donations;
  try {
    donations = await Donation.find({ donator: donator });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "No se encontron donaciones de ese usuario",
      500
    );
    return next(error);
  }
  console.log(donations);
  if (!donations || donations.length === 0) {
    res.json({ donations: [] });
  } else {
    res.json({
      donations: donations.map((donations) =>
        donations.toObject({ getters: true })
      ),
    });
  }
};

const getDonationsRealizadasByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let donations;
  try {
    donations = await Donation.find({ post_creator_id: userId });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "No se encontron donaciones de ese usuario",
      500
    );
    return next(error);
  }
  console.log(donations);
  if (!donations || donations.length === 0) {
    res.json({ donations: [] });
  } else {
    res.json({
      donations: donations.map((donations) =>
        donations.toObject({ getters: true })
      ),
    });
  }
};

const getDonations = async (req, res, next) => {
  let donations;
  try {
    donations = await Donation.find();
  } catch (err) {
    console.log(err);
    const error = new HttpError("No se encontron donations", 500);
    return next(error);
  }
  if (!donations || donations.length === 0) {
    const error = new HttpError(
      "No se encontro ningun post en la base de datos",
      404
    );
    return next(error);
  }
  res.json({
    donations: donations.map((donation) =>
      donation.toObject({ getters: true })
    ),
  });
};

const updateDonationState = async (req, res, next) => {
  console.log(req.body);
  const { new_state } = req.body;

  const id = req.params.did;
  let donation;
  try {
    donation = await Donation.updateOne(
      { _id: id },
      {
        $set: {
          state: new_state,
        },
      }
    );
  } catch (err) {
    console.log(err);
    const error = new HttpError("Error", 500);
    return next(error);
  }

  if (!donation) {
    const error = new HttpError("Error", 404);
    return next(error);
  }
  res.json({ donation: donation });
};
exports.updateDonationState = updateDonationState;
exports.getDonationsRealizadasByUserId = getDonationsRealizadasByUserId;
exports.getDonationsByUserId = getDonationsByUserId;
exports.getDonations = getDonations;
exports.setDonation = setDonation;
exports.getPosts = getPosts;
exports.createPost = createPost;
exports.getPostById = getPostById;
exports.getPostsByUserId = getPostsByUserId;
exports.updatePostById = updatePostById;
exports.deletePostById = deletePostById;
exports.getPostsByCategory = getPostsByCategory;
exports.getPostsByCiudad = getPostsByCiudad;
exports.getPostsByCategoriaCiudad = getPostsByCategoriaCiudad;
