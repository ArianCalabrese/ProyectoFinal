import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Modal,
  Paper,
} from "@material-ui/core";
import { ImageList, ImageListItem, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "../../shared/components/FormElements/Button";
import MyCards from "./components/Card";

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
  const [open, setOpen] = useState(false);
  const [openGoods, setGoodsOpen] = useState(false);

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
  return (
    <React.Fragment>
      <MainNavigation />
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
            <Box sx={{ flex: "0.5", padding: "1rem" }} className="imageWrapper">
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
                <Typography variant="h2">Titulo de la donacion</Typography>
                <ListItem>
                  <LocationOnIcon />
                  <Typography variant="h4">
                    Lomas de Zamora, Buenos Aires
                  </Typography>
                </ListItem>
              </Box>
              <Box sx={{ flex: "2" }}>
                <Typography variant="p">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
                  ab accusantium atque eos ea optio cupiditate, aspernatur
                  reiciendis! Magnam corrupti minus natus reprehenderit tenetur
                  magni iusto. Dolorum delectus illum illo! Lorem ipsum dolor
                  sit amet consectetur, adipisicing elit. Fugit numquam maiores
                  eius adipisci modi consectetur voluptatum ullam illo quas!
                  Dolorum amet fugit sit rem laudantium quae molestiae,
                  consequuntur praesentium aspernatur? Lorem ipsum dolor sit
                  amet consectetur adipisicing elit. Enim cum iure ipsam illum,
                  unde quidem aut quis dignissimos rerum dolor. Autem earum
                  minima voluptatum expedita illo molestiae delectus, dolorem
                  iure.
                </Typography>
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
                  <Typography variant="p">Categoria: Inmuebles</Typography>
                </Box>
                <Box sx={{ flex: "1", display: "flex", flexDirection: "row" }}>
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
                      Arian Calabrese
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
                    <img
                      src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format"
                      srcSet="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format"
                      alt={"testing"}
                      loading="lazy"
                      style={{ maxHeight: "80px", maxWidth: "80px" }}
                    />
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
              open={open}
              onClose={handleMoneyClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Seleccione lo que desea donar
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="End"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="End"
                  />
                  <FormControlLabel
                    value="end"
                    control={<Checkbox />}
                    label="End"
                  />
                </FormGroup>
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
    </React.Fragment>
  );
};

export default PostPage;
