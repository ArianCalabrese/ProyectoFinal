import React, { useEffect, useState, useContext } from "react";
import { ThemeProvider } from "@material-ui/core/styles";

import AboutUs from "../components/sections/AboutUs";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TopSection from "../components/sections/TopSection";

import { makeStyles } from "@material-ui/core/styles";
import Footer from "../components/sections/Footer";
import Mision from "../components/sections/Mision";

import { UserContext } from "../../Context/UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    margin: 0,
  },
  titulo: {
    height: "10vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "1vh",
    marginBottom: "1vh",
  },
}));

const Home = () => {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);
  return (
    <div className={classes.root}>
      <TopSection />
      <Box>
        <Typography component="div" className={classes.titulo}>
          <Typography variant="h3" component="h2" align="center">
            Nuestra Historia
          </Typography>
        </Typography>
      </Box>
      <Mision />
      <Box>
        <Typography component="div" className={classes.titulo}>
          <Typography variant="h3" component="h2" align="center">
            Top Posts
          </Typography>
        </Typography>
      </Box>

      <AboutUs />
      <Box>
        <Typography component="div" className={classes.titulo}>
          <Typography variant="h3" component="h2" align="center">
            Sponsors
          </Typography>
        </Typography>
      </Box>

      {/* <TestSponsor /> */}
      <Footer />
    </div>
  );
};

export default Home;