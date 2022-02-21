import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Modal,
  Paper,
  TextField,
} from "@material-ui/core";
import { ImageList, ImageListItem, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "../../shared/components/FormElements/Button";
import MyCards from "./components/Card";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UiElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../../shared/context/UserContext";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const PostPage = () => {
  const auth = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [openGoods, setGoodsOpen] = useState(false);

  const [loadedPost, setLoadedPost] = useState();
  const [user, setUser] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const postId = useParams().postId;

  //ITEMS TO DONATE
  const [itemsToDonate, setitemsToDonate] = useState([]);

  const handleItemOnChange = (i, e) => {
    console.log(e);
    const newItems = itemsToDonate.map((item) => {
      if (item == i) {
        let total = parseInt(e.target.value) + parseInt(item.already_donated);
        console.log(total);
        return {
          item_name: item.item_name,
          item_amount: item.item_amount,
          already_donated: total,
        };
      }
      return item;
    });
    console.log(newItems);
    setitemsToDonate(newItems);
  };
  //
  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log(postId);
        const responseData = await sendRequest(
          `http://localhost:5000/api/posts/${postId}`
        );
        setLoadedPost(responseData.post);
        setitemsToDonate(responseData.post.items);
        console.log(responseData.post);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [sendRequest, postId]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log(loadedPost);
        const responseUserData = await sendRequest(
          `http://localhost:5000/api/users/id/${loadedPost.creator}`
        );
        setUser(responseUserData.user);
        console.log(responseUserData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [sendRequest, loadedPost]);

  const handleMoneyOpen = () => {
    setOpen(true);
  };
  const handleMoneyClose = () => {
    setOpen(false);
  };

  const handleGoodsOpen = () => {
    setGoodsOpen(true);
  };
  const handleGoodsClose = () => {
    setGoodsOpen(false);
  };

  const handleDonation = async () => {
    const response = await sendRequest(
      `http://localhost:5000/api/posts/${loadedPost.id}/donaciones`,
      "POST",
      JSON.stringify({
        items: itemsToDonate,
        donator: auth.userId,
        post_name: loadedPost.title,
        post_creator_id: loadedPost.creator,
      }),
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      }
    );
    console.log(response);
  };

  return (
    <React.Fragment>
      <MainNavigation />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPost && user && (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignContent: "center",
          }}
        >
          <Paper
            elevation={6}
            style={{
              width: "100%",
              margin: "2rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                flex: "1",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Box
                sx={{ flex: "0.5", padding: "1rem" }}
                className="imageWrapper"
              >
                <ImageList cols={3} variant="quilted" rowHeight={164}>
                  <ImageListItem
                    key="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format"
                    cols={3}
                    rows={2}
                  >
                    <img
                      {...srcset(
                        "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format",
                        121,
                        2,
                        1
                      )}
                      alt={"testing"}
                      loading="lazy"
                    />
                  </ImageListItem>
                  <ImageListItem
                    key="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format"
                    cols={1}
                    rows={1}
                  >
                    <img
                      {...srcset(
                        "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format",
                        121,
                        1,
                        1
                      )}
                      alt={"testing"}
                      loading="lazy"
                    />
                  </ImageListItem>
                  <ImageListItem
                    key="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format"
                    cols={1}
                    rows={1}
                  >
                    <img
                      {...srcset(
                        "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format",
                        121,
                        1,
                        1
                      )}
                      alt={"testing"}
                      loading="lazy"
                    />
                  </ImageListItem>
                  <ImageListItem
                    key="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format"
                    cols={1}
                    rows={1}
                  >
                    <img
                      {...srcset(
                        "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format",
                        121,
                        1,
                        3
                      )}
                      alt={"testing"}
                      loading="lazy"
                    />
                  </ImageListItem>
                </ImageList>
              </Box>
              <Box
                sx={{
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                }}
                className="mainDataWrapper"
              >
                <Box sx={{ flex: "1" }}>
                  <Typography variant="h2">{loadedPost.title}</Typography>
                  <ListItem>
                    <LocationOnIcon />
                    <Typography variant="h4">{loadedPost.ciudad}</Typography>
                  </ListItem>
                </Box>
                <Box sx={{ flex: "2" }}>
                  <Typography variant="p">{loadedPost.description}</Typography>
                </Box>
                <Box
                  sx={{
                    flex: "0.5",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Box
                    sx={{
                      flex: "1",
                      alignSelf: "flex-end",
                      paddingBottom: "1rem",
                    }}
                  >
                    <Typography variant="p">
                      Categoria: {loadedPost.categoria}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ flex: "1", display: "flex", flexDirection: "row" }}
                  >
                    <Box
                      sx={{
                        flex: "0.5",

                        display: "flex",
                        flexDirection: "column",
                        alignItems: "end",
                        padding: "1rem",
                      }}
                    >
                      <Typography variant="p" sx={{ flex: "1" }}>
                        Creado por:
                      </Typography>
                      <Typography variant="p" sx={{ flex: "1" }}>
                        {user.name}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        flex: "0.5",
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center",
                      }}
                    >
                      <a href={"/user/" + user.id}>
                        <img
                          src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format"
                          srcSet="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format"
                          alt={"testing"}
                          loading="lazy"
                          style={{ maxHeight: "80px", maxWidth: "80px" }}
                        />
                      </a>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{ flex: "1", backgroundColor: "blue" }}
              className="secondaryDataWrapper"
            >
              <Button onClick={handleMoneyOpen}>Donar dinero</Button>
              <Button onClick={handleGoodsOpen}>Donar bienes</Button>
              <Modal
                open={openGoods}
                onClose={handleGoodsClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Seleccione lo que desea donar
                  </Typography>
                  <Box>
                    {loadedPost.items.map((item) => {
                      return (
                        <React.Fragment>
                          <TextField
                            id="standard-basic"
                            label="Cantidad"
                            variant="standard"
                            onChange={(e) => handleItemOnChange(item, e)}
                          />
                          <Typography variant="p">{item.item_name}</Typography>
                        </React.Fragment>
                      );
                    })}
                    <Button onClick={handleDonation}>Donar</Button>
                  </Box>
                </Box>
              </Modal>
              <Modal
                open={open}
                onClose={handleMoneyClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box>
                  <MyCards />
                </Box>
              </Modal>
            </Box>
          </Paper>
        </Box>
      )}
    </React.Fragment>
  );
};

export default PostPage;
