import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { IconButton } from "@material-ui/core";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import MailIcon from "@material-ui/icons/Mail";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 326,
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: "auto",
  },
  pos: {
    padding: "auto",
    textAlign: "center",
  },
  bottomButtons: {
    margin: "auto",
  },
}));

const handleMailClick = (mail) => {
  window.open(``, "_self");
};

const handleLinkedInClick = (id) => {
  window.open(`https://www.linkedin.com/in/${id}`, "_self");
};

const clickMe = (id) => (event) => {
  window.open(`https://www.linkedin.com/in/${id}`, "_self");
};

const clickMe2 = (mail) => (event) => {
  window.location.href = `mailto:${mail}`;
};

const GridItem = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Avatar
          src={props.img}
          className={classes.large}
          style={{
            border: "0.1px solid black",
          }}
        />
        <Typography variant="h5" component="h2" className={classes.pos}>
          {props.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.rol}
        </Typography>
        <Typography variant="body2" component="p" className={classes.pos}>
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="home"
          className={classes.bottomButtons}
          onClick={clickMe(props.linkedin)}
        >
          <LinkedInIcon color="primary" fontSize="large" />
        </IconButton>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="home"
          className={classes.bottomButtons}
          onClick={clickMe2(props.mail)}
        >
          <MailIcon color="secondary" fontSize="large" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default GridItem;