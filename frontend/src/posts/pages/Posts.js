import React, { useEffect, useReducer, useState } from "react";

import PostList from "../components/PostList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UiElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import CategoryIcon from "@mui/icons-material/Category";
import { TextField } from "@material-ui/core";
import { Button } from "@mui/material";

const drawerWidth = 240;

const Posts = () => {
  const [city, setCity] = React.useState("");
  const [category, setCategory] = React.useState("");

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmitQuery = async (event) => {
    event.preventDefault();

    try {
      if (category !== "" && city === "") {
        console.log(category);
        const responseData = await sendRequest(
          `http://localhost:5000/api/posts/categoria/${category}`
        );
        setLoadedPosts(responseData.posts);
      } else if (city !== "" && category === "") {
        console.log(city);
        const responseData = await sendRequest(
          `http://localhost:5000/api/posts/ciudad/${city}`
        );
        setLoadedPosts(responseData.posts);
      } else if (city !== "" && category !== "") {
        console.log(city);
        console.log(category);
        const responseData = await sendRequest(
          `http://localhost:5000/api/posts/buscar/${category}/${city}`
        );
        setLoadedPosts(responseData.posts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPosts, setLoadedPosts] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/posts"
        );
        setLoadedPosts(responseData.posts);
      } catch (err) {}
    };
    fetchPosts();
  }, [sendRequest]);
  return (
    <React.Fragment>
      <MainNavigation />
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              marginTop: "65px",
            },
          }}
        >
          <Box sx={{ overflow: "hidden" }}>
            <List>
              <ListItem>
                <TextField
                  id="outlined-basic"
                  label="Nombre del post"
                  variant="outlined"
                />
              </ListItem>
              <ListItem>
                <NotListedLocationIcon />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Ciudad
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={city}
                    onChange={handleCityChange}
                    label="Ciudad"
                  >
                    <MenuItem value="">
                      <em>Seleccione una ciudad</em>
                    </MenuItem>
                    <MenuItem value="La Plata">La Plata</MenuItem>
                    <MenuItem value="Capital Federal">Capital Federal</MenuItem>
                    <MenuItem value="Lanus">Lanus</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
              <ListItem>
                <CategoryIcon />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Categoria
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={category}
                    onChange={handleCategoryChange}
                    label="Categoria"
                  >
                    <MenuItem value="">
                      <em>Seleccione una categoria</em>
                    </MenuItem>
                    <MenuItem value="Mueble">Mueble</MenuItem>
                    <MenuItem value="Alimento">Alimento</MenuItem>
                    <MenuItem value="Transporte">Transporte</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
            </List>
            <Divider />
            <Button variant="contained" onClick={handleSubmitQuery}>
              Buscar
            </Button>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <ErrorModal error={error} onClear={clearError} />
          {isLoading && (
            <div className="center">
              <LoadingSpinner />
            </div>
          )}
          {!isLoading && loadedPosts && (
            <div className="loadedPosts">
              <PostList items={loadedPosts} />
            </div>
          )}
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Posts;
