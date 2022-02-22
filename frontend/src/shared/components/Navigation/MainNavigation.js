import React, { useContext } from "react";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { UserContext } from "../../context/UserContext";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
  },
});

const MainNavigation = () => {
  const classes = useStyles();
  const history = useHistory();

  const auth = useContext(UserContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDisconnectMenu = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
    auth.logout();
  };

  const handleDonations = (event) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData);
    if (userData.userId) {
      history.push("/user/" + userData.userId + "/donaciones");
    } else {
      window.location.reload();
    }
  };
  const handlePedidos = (event) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData);
    if (userData.userId) {
      history.push("/user/" + userData.userId + "/pedidos");
    } else {
      window.location.reload();
    }
  };
  const handleConfiguration = (event) => {};

  const handleMyAccount = (event) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData);
    if (userData.userId) {
      history.push("/user/" + userData.userId);
    } else {
      window.location.reload();
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMyAccount}>Mi Cuenta</MenuItem>
      <MenuItem onClick={handleDonations}>Donaciones</MenuItem>
      <MenuItem onClick={handlePedidos}>Pedidos</MenuItem>
      <MenuItem onClick={handleConfiguration}>Configuracion</MenuItem>
      <MenuItem onClick={handleDisconnectMenu}>Desconectarme</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Mensajes</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="Ver las 17 notificaciones"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notificaciones</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Perfil</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <a href="/" key="home" className={classes.linkText}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              CALM
            </Typography>
          </a>
          <List component="nav">
            <a href="/posts" key="posts" className={classes.linkText}>
              <ListItem button>
                <ListItemText primary="Ver Posts" />
              </ListItem>
            </a>
          </List>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {auth.isLoggedIn && (
              <List component="nav">
                <a
                  href="/agregarpost"
                  key="agregarpost"
                  className={classes.linkText}
                >
                  <ListItem button>
                    <ListItemText primary="Agregar Post" />
                  </ListItem>
                </a>
              </List>
            )}
            {!auth.isLoggedIn ? (
              <List component="nav">
                <a href="/login" key="login" className={classes.linkText}>
                  <ListItem button>
                    <ListItemText primary="Ingresar" />
                  </ListItem>
                </a>
              </List>
            ) : (
              <React.Fragment>
                {" "}
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </React.Fragment>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default MainNavigation;
