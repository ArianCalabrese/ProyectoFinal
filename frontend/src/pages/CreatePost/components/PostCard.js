import React from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import yellow from "@material-ui/core/colors/yellow";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { ImageList, ImageListItem, List, ListItem } from "@mui/material";
import { ListItemText } from "@material-ui/core";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `black`,
    marginBottom: 0,
  },
});

const PostCard = (props) => {
  const classes = useStyles();

  return (
    <Paper elevation={6}>
      <Box
        sx={{
          margin: 1,
          height: "80%",
          display: "flex",
          padding: "1rem",
          flexFlow: "row wrap",
          alignContent: "center",
        }}
      >
        <Box className="imageWrapper" sx={{ width: "30%", height: 280 }}>
          <img
            src={`http://localhost:5000/${props.image}`}
            srcSet={`http://localhost:5000/${props.image}`}
            alt={props.title}
            loading="lazy"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
        <Box className="dataWrapper" sx={{ paddingLeft: "2rem" }}>
          <Typography variant="h3">{props.title}</Typography>
          <Box>
            <Typography variant="h5">{props.ciudad}</Typography>
            <Typography variant="h5">{props.categoria}</Typography>
          </Box>
          <Box>
            <a
              href={"/posts/" + props.id}
              key={props.id}
              className={classes.linkText}
            >
              <Button variant="contained">Ver</Button>
            </a>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default PostCard;
