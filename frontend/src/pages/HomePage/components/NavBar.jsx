import React, { useContext } from "react";
import {
  AppBar,
  makeStyles,
  Toolbar,
  IconButton,
  Container,
  Hidden,
} from "@material-ui/core";

import { Home } from "@material-ui/icons";
import SideDrawer from "./SideDrawer";
import HideOnSCroll from "./HideOnScroll";
import { UserContext } from "../../../Context/UserContext";
import NavLinks from "./NavLinks";

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
  },
  navbarDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
}));

const navLinks = [
  { title: `Nosotros`, path: `/about-us` },
  { title: `FAQ`, path: `/about-us` },
  { title: `Ingresar`, path: `/login` },
];

const NavBar = () => {
  const classes = useStyles();
  const auth = useContext(UserContext);
  return (
    <div className={classes.offset}>
      <HideOnSCroll>
        <AppBar position="fixed">
          <Toolbar>
            <Container maxWidth="md" className={classes.navbarDisplayFlex}>
              <IconButton edge="start" color="inherit" aria-label="home">
                <Home fontSize="large" />
              </IconButton>
              <Hidden smDown>
                <NavLinks />
              </Hidden>
              <Hidden mdUp>
                <SideDrawer navLinks={navLinks} />
              </Hidden>
            </Container>
          </Toolbar>
        </AppBar>
      </HideOnSCroll>
    </div>
  );
};

export default NavBar;
