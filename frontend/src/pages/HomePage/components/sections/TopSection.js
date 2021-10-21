import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";

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
