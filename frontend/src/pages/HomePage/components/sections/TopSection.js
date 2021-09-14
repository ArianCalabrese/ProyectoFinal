import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 480,
  },
}));

const TopSection = () => {
  const classes = useStyles();
  return (
      <CardMedia
        className={classes.media}
        image="https://wallpapercave.com/wp/wp2752752.jpg"
      />
  );
};

export default TopSection;
