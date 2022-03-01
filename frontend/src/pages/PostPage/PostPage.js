import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
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
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { UserContext } from "../../shared/context/UserContext";
import ChatIcon from "@mui/icons-material/Chat";

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
  const history = useHistory();

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
  const handleChatOpen = (event) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData);
    if (userData.userId) {
      history.push("/chat");
    } else {
      window.location.reload();
    }
  };

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

  const [openDonation, setDonationOpen] = useState(false);

  const handleDonationClose = () => {
    setDonationOpen(false);
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
    setGoodsOpen(false);
    setDonationOpen(true);
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
                    key="https://www.resumenlatinoamericano.org/wp-content/uploads/2021/05/mil-ollas.jpg"
                    cols={3}
                    rows={2}
                  >
                    <img
                      {...srcset(
                        "https://www.resumenlatinoamericano.org/wp-content/uploads/2021/05/mil-ollas.jpg",
                        121,
                        2,
                        1
                      )}
                      alt="postImage"
                      loading="lazy"
                    />
                  </ImageListItem>
                  <ImageListItem
                    key="https://www.lt8.com.ar/wp-content/uploads/2020/10/Comedor-Escolar-Santa-Fe-El-Litoral.jpg"
                    cols={1}
                    rows={1}
                  >
                    <img
                      {...srcset(
                        "https://www.lt8.com.ar/wp-content/uploads/2020/10/Comedor-Escolar-Santa-Fe-El-Litoral.jpg",
                        121,
                        1,
                        1
                      )}
                      alt="postImage"
                      loading="lazy"
                    />
                  </ImageListItem>
                  <ImageListItem
                    key="https://elcirculo.com.ar/wp-content/uploads/2019/08/68b205b3d673a99e84235aa4cfe35c06_MAIN.jpg"
                    cols={1}
                    rows={1}
                  >
                    <img
                      {...srcset(
                        "https://elcirculo.com.ar/wp-content/uploads/2019/08/68b205b3d673a99e84235aa4cfe35c06_MAIN.jpg",
                        121,
                        1,
                        1
                      )}
                      alt="postImage"
                      loading="lazy"
                    />
                  </ImageListItem>
                  <ImageListItem
                    key="https://elcirculo.com.ar/wp-content/uploads/2019/08/68b205b3d673a99e84235aa4cfe35c06_MAIN.jpg"
                    cols={1}
                    rows={1}
                  ></ImageListItem>
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
                  ></Box>
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
                        <IconButton
                          size="large"
                          aria-label="show 4 new mails"
                          color="inherit"
                          onClick={handleChatOpen}
                        >
                          <ChatIcon />
                        </IconButton>
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
                          src="https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png"
                          srcSet="https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png"
                          alt="userImage"
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
              sx={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "1rem",
              }}
              className="secondaryDataWrapper"
            >
              <Box className="botonera" sx={{ paddingTop: "1rem" }}>
                <Button onClick={handleMoneyOpen}>Donar dinero</Button>
                <Button onClick={handleGoodsOpen}>Donar bienes</Button>
              </Box>
              <Modal open={openGoods} onClose={handleGoodsClose} style={style}>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "1rem",
                  }}
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Seleccione lo que desea donar
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "1rem 0",
                    }}
                  >
                    {loadedPost.items.map((item) => {
                      return (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <TextField
                            id="standard-basic"
                            label="Cantidad"
                            variant="standard"
                            onChange={(e) => handleItemOnChange(item, e)}
                          />
                          <Typography variant="p">{item.item_name}</Typography>
                        </Box>
                      );
                    })}
                  </Box>

                  <Button onClick={handleDonation}>Donar</Button>
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
              <Modal
                open={openDonation}
                onClose={handleDonationClose}
                style={style}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: "10rem",
                  }}
                >
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Donación realizada con exito!
                  </Typography>
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
