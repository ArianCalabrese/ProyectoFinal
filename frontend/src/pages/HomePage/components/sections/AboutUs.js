import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import GridItem from "./GridItem";

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

const AboutUs = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs>
          <GridItem />
        </Grid>
        <Grid item xs>
          <GridItem />
        </Grid>
        <Grid item xs>
          <GridItem />
        </Grid>
        <Grid item xs>
          <GridItem />
        </Grid>
      </Grid>
    </div>
  );
};

export default AboutUs;
