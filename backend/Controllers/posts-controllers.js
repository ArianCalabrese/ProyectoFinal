const { uuid } = require('uuidv4');
const { validationResult } = require("express-validator");
const HttpError = require("../Models/http-error");

const Post = require('../Models/post');

let DUMMY_POSTS = [
  {
    id: "p1",
    title: "Escoba",
    description: "Regalo escoba",
    categoria: "Limpieza",
    imagen:"",
    creator: "ul",
  },
  {
    id: "p2",
    title: "Cama",
    description: "Cama de plaza y media",
    categoria: "Mueble",
    imagen:"",
    creator: "ul",
  },
  {
    id: "p3",
    title: "Ropero",
    description: "Ropero de dos cuerpos",
    categoria: "Mueble",
    imagen:"",
    creator: "uo",
  }
];

//devuelve todos los posts /api/posts
const getPosts = (req, res, next) => {
    res.json({ posts: DUMMY_POSTS});
};

//Devuleve el post que coincide con el id /api/posts/{id}
const getPostById = (req, res, next) => {
  const postId = req.params.pid;
  const post = DUMMY_POSTS.find((p) => {
    return p.id === postId;
  });

  if (!post) {
    return next(new HttpError("No se encontro ningun post con ese id", 404));
  }

  res.json({ post });
};

//Devuleve los posts de un usuario /api/posts/user/{id}
const getPostsByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const posts = DUMMY_POSTS.filter((p) => {
    return p.creator === userId;
  });

  if (!posts || posts.length === 0) {
    return next(
      new HttpError("No se encontro ningun post de ese usuario", 404)
    );
  }

  res.json({ posts });
};

//Crea un post nuevo, titulo, descripcion y categoria son obligatorios
// /api/posts ( metodo POST)
const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return next(new HttpError('Datos invalidos, chequea los datos',422));
  };

  const { title, description,categoria, creator } = req.body;
  const createdPost = new Post({
    title: title,
    description: description,
    categoria: categoria,
    imagen: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Dainikeihin_at_Shirokanetakanawa.jpg",
    creator: creator
  });
  try {
    await createdPost.save();
  } catch(err) {
    const error = new HttpError(
      'Falla al crear el post',
       500
    );
    return next(error);
  }
  res.status(201).json({ post: createdPost });
};

//Modifica datos del post por id, /api/posts/{id} (metodo PATCH)
const updatePostById = (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return next(new HttpError('Datos invalidos', 422));
  };
    const { title, description } = req.body;
    const postId = req.params.pid;

    const updatedPost = { ...DUMMY_POSTS.find(p => p.id === postId)};
    const postIndex = DUMMY_POSTS.findIndex(p => p.id === postId);
    if(title){
    updatedPost.title = title;
    };
    if(description){
    updatedPost.description = description;
    };
    DUMMY_POSTS[postIndex] = updatedPost;

    res.status(200).json({post: updatedPost});
};

//Borra un post por id, /api/posts/{id} (Metodo DELETE)
const deletePostById = (req, res, next) => {
  const postId = req.params.pid;
  if (!DUMMY_POSTS.find(p => p.id === postId )){
    return next(new HttpError("no se encontro el post para borrar", 404));
  }
  DUMMY_POSTS = DUMMY_POSTS.filter(p => p.id !== postId );
  res.status(200).json({message: ' Post borrado'});
};

//Devuelve lso post de una categoria /api/posts/categoria/{categoria}
const getPostsByCategory = (req, res, next) => {
    const categoria = req.params.categoria;
    const post = DUMMY_POSTS.filter((p) => {
        return p.categoria === categoria;
      });
    if(!post || post.length === 0){
        return next(new HttpError('No se encontro ningun post de esa categoria', 404));
    }

    res.json({ post });
    
}

exports.getPosts = getPosts;
exports.createPost = createPost;
exports.getPostById = getPostById;
exports.getPostsByUserId = getPostsByUserId;
exports.updatePostById = updatePostById;
exports.deletePostById = deletePostById;
exports.getPostsByCategory = getPostsByCategory;