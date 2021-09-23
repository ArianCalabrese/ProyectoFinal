import { List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../../Context/UserContext";

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

const NavLinks = (props) => {
  const classes = useStyles();
  const auth = useContext(UserContext);
  console.log("NAVLINGKS: " + auth.userId);
  return (
    <List
      component="nav"
      aria-labelledby="main navigation"
      className={classes.navDisplayFlex}
    >
      <a href="/about-us" key="Nosotros" className={classes.linkText}>
        <ListItem button>
          <ListItemText primary="Nosotros" />
        </ListItem>
      </a>
      <a href="/about-us" key="FAQ" className={classes.linkText}>
        <ListItem button>
          <ListItemText primary="FAQ" />
        </ListItem>
      </a>
      {auth.isLoggedIn && (
        <a href="/about-us" key="CreatePost" className={classes.linkText}>
          <ListItem button>
            <ListItemText primary="Crear Post" />
          </ListItem>
        </a>
      )}
      {auth.isLoggedIn && (
        <a
          href={`/user/${auth.userId}`}
          key="Account"
          className={classes.linkText}
        >
          <ListItem button>
            <ListItemText primary="Cuenta" />
          </ListItem>
        </a>
      )}
      {auth.isLoggedIn && (
        <a href="/" key="Logout" className={classes.linkText}>
          <ListItem button>
            <ListItemText primary="Logout" onClick={auth.logout} />
          </ListItem>
        </a>
      )}
      {!auth.isLoggedIn && (
        <a href="/login" key="Ingresar" className={classes.linkText}>
          <ListItem button>
            <ListItemText primary="Ingresar" />
          </ListItem>
        </a>
      )}
    </List>
  );
};

export default NavLinks;
