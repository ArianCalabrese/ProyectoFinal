import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import yellow from "@material-ui/core/colors/yellow";
import red from "@material-ui/core/colors/red";
import Box from "@material-ui/core/Box";
import grey from "@material-ui/core/colors/grey";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "red",
    height: "15vh",
    margin: 0,
    width: "100%",
    overflow: "hidden",
  },
  span: {
    paddingLeft: 10,
  },
}));
const TestSponsor = () => {
  const classes = useStyles();
  const [coordinates, setCoordinates] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCoordinates((coordinates) => {
        if (coordinates >= 50) {
          return 0;
        }
        return coordinates + 0.1;
      });
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box className={classes.root}>
      <div style={{ transform: `translateX(${coordinates}%) ` }}>
        <img
          className="team-image"
          src="https://logodownload.org/wp-content/uploads/2014/04/McDonalds-logo-1.png"
          style={{ maxWidth: 200 }}
        />
        <img
          className="team-image"
          src="https://logodownload.org/wp-content/uploads/2014/04/McDonalds-logo-1.png"
          style={{ maxWidth: 200 }}
        />
        <img
          className="team-image"
          src="https://logodownload.org/wp-content/uploads/2014/04/McDonalds-logo-1.png"
          style={{ maxWidth: 200 }}
        />
        <img
          className="team-image"
          src="https://logodownload.org/wp-content/uploads/2014/04/McDonalds-logo-1.png"
          style={{ maxWidth: 200 }}
        />
        <img
          className="team-image"
          src="https://logodownload.org/wp-content/uploads/2014/04/McDonalds-logo-1.png"
          style={{ maxWidth: 200 }}
        />
      </div>
    </Box>
  );
};

export default TestSponsor;
