import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { IconButton } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: "10rem",
    margin: 0,
  },
  bottomButtons: {
    alignContent: "right",
  },
});

const PostItem = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardMedia
        className={classes.media}
        image="https://wallpapercave.com/wp/wp2752752.jpg"
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.location}
        </Typography>
        <Typography variant="body2" component="p">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.bottomButtons}>
        <IconButton edge="end" color="inherit" aria-label="home">
          <ShareIcon />
        </IconButton>
        <IconButton edge="end" color="inherit" aria-label="home">
          <ArrowForwardIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PostItem;
