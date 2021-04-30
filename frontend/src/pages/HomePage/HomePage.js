import React, { useEffect, useState, useContext } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import NavBar from "./components/NavBar";
import AboutUs from "./components/sections/AboutUs";

import theme from "../../temaConfig";
const HomePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <AboutUs />
    </ThemeProvider>
  );
};

export default HomePage;
