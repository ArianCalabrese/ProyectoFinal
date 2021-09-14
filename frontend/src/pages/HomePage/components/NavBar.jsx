import React from "react";
import {
  AppBar,
  makeStyles,
  Toolbar,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  Container,
  Hidden,
} from "@material-ui/core";
import { NavLink, Link } from "react-router-dom";

import MenuIcon from "@material-ui/icons/Menu";
import { Home } from "@material-ui/icons";
import SideDrawer from "./SideDrawer";
import HideOnSCroll from "./HideOnScroll";

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
  { title: `about us`, path: `/about-us` },
  { title: `login`, path: `/login` },
];

const NavBar = () => {
  const classes = useStyles();
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
                <List
                  component="nav"
                  aria-labelledby="main navigation"
                  className={classes.navDisplayFlex}
                >
                  {navLinks.map(({ title, path }) => (
                    <a href={path} key={title} className={classes.linkText}>
                      <ListItem button>
                        <ListItemText primary={title} />
                      </ListItem>
                    </a>
                  ))}
                </List>
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
