import React, { useState, useCallback } from "react";
//import { ThemeProvider } from "@material-ui/core/styles";
import NavBar from "./components/NavBar";
import AboutUs from "./components/sections/AboutUs";
//import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TopSection from "./components/sections/TopSection";
import MostValuablePosts from "./components/sections/MostValuablePosts";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "./components/sections/Footer";
import Mision from "./components/sections/Mision";
import Sponsors from "./components/sections/Sponsors";
import TestSponsor from "./components/sections/TestSponsor";
import { AuthContext } from "../../shared/context/auth-context";
//me tira error
//import ProgressBar from "../../../react-progressbar-on-scroll";
import ProgressBar from "react-progressbar-on-scroll";
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

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const classes = useStyles();
  <div id="modal-hook"></div>;
  const { user, setUser } = useContext(UserContext);
  return (
    <div className={classes.root}>
      <AuthContext.Provider
        value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
      >
        <NavBar />
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

        <MostValuablePosts />
        <Box>
          <Typography component="div" className={classes.titulo}>
            <Typography variant="h3" component="h2" align="center">
              Nosotros
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
      <Sponsors />
      {/* <TestSponsor /> */}
      <Footer />
      </AuthContext.Provider>
    </div>
  );
};

export default HomePage;
