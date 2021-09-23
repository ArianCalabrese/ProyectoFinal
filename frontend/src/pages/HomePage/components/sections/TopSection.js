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
        image="https://www.doorwaysarizona.com/wp-content/uploads/2013/10/bigstock-portrait-of-a-happy-and-divers-19389686.jpg"
      />
  );
};

export default TopSection;
