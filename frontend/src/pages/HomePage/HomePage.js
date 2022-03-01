import React from "react";
import AboutUs from "./components/sections/AboutUs";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TopSection from "./components/sections/TopSection";
import MostValuablePosts from "./components/sections/MostValuablePosts";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "./components/sections/Footer";
import Mision from "./components/sections/Mision";
import Sponsors from "./components/sections/Sponsors";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";

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
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MainNavigation />
      <TopSection />
      <Box>
        <Typography component="div" className={classes.titulo}>
          <Typography variant="h3" component="h2" align="center">
            Nuestra Historia
          </Typography>
        </Typography>
      </Box>
      <Mision />
      {/* <Box>
        <Typography component="div" className={classes.titulo}>
          <Typography variant="h3" component="h2" align="center">
            Top Posts
          </Typography>
        </Typography>
      </Box> */}

      {/* <MostValuablePosts /> */}
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
      <Footer />
    </div>
  );
};

export default HomePage;
