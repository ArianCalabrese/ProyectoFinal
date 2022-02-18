import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PostItem from "./PostItem";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: 100,
    paddingRight: 100,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const postsHardcoded = [
  {
    title: "post1",
    description:
      "Esta es una iniciativa por parte de la municipalidad para proveer de casas a familias que no tienen hogar actualmente y con voluntarios que se ofrecen a levantar las estructuras.",
    location: "Lomas de Zamora, Buenos Aires",
    user: "Username",
  },
  {
    title: "post1",
    description:
      "Esta es una iniciativa por parte de la municipalidad para proveer de casas a familias que no tienen hogar actualmente y con voluntarios que se ofrecen a levantar las estructuras.",
    location: "Lomas de Zamora, Buenos Aires",
    user: "Username",
  },
  {
    title: "post1",
    description:
      "Esta es una iniciativa por parte de la municipalidad para proveer de casas a familias que no tienen hogar actualmente y con voluntarios que se ofrecen a levantar las estructuras.",
    location: "Lomas de Zamora, Buenos Aires",
    user: "Username",
  },
  {
    title: "post1",
    description:
      "Esta es una iniciativa por parte de la municipalidad para proveer de casas a familias que no tienen hogar actualmente y con voluntarios que se ofrecen a levantar las estructuras.",
    location: "Lomas de Zamora, Buenos Aires",
    user: "Username",
  },
];
const MostValuablePosts = () => {
  const classes = useStyles();
  const posts = postsHardcoded.map((post) => (
    <Grid item xs>
      <PostItem
        title={post.title}
        location={post.location}
        description={post.description}
        user={post.user}
      />
    </Grid>
  ));
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        {posts}
      </Grid>
    </div>
  );
};

export default MostValuablePosts;
