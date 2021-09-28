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
import qr from "./frame.png";
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
    alignItems: "center"
  },
  media: {
    padding: "1rem",
    margin: "1rem",
    width: "240px",
    height: "240px",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Box className={classes.footer}>
      <CardMedia className={classes.media} image={qr} />
      <Typography variant="h5" component="h5" align="center">
        © Todos los derechos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;