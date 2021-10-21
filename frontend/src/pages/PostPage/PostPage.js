import { Paper } from "@material-ui/core";
import { ImageList, ImageListItem, ListItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const PostPage = () => {
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
                      alt="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format"
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
          ></Box>
        </Paper>
      </Box>
    </React.Fragment>
  );
};

export default PostPage;
