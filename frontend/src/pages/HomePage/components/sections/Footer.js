import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    margin: 0,
  },
  footer: {
    height: "40vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "5vh",
    backgroundColor: "#d35d6e",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return <Box className={classes.footer}></Box>;
};

export default Footer;
