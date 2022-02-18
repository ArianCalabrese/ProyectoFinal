import React, { useState } from "react";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { FormControlLabel, Paper, Switch, TextField } from "@material-ui/core";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { ImageList, ImageListItem, ListItem, Typography } from "@mui/material";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UiElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner";
import Axios from "axios";
import ImageLoader from "./components/ImageLoader";
import Geocoder from "./components/Geocoder";

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

function getSteps() {
  return ["Información Basica", "Imagenes y Ubicación", "Revisión"];
}

const CreatePost = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const steps = getSteps();
  const [activeStep, setActiveStep] = useState(0);
  const [checked, setChecked] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleMoneyChange = (e) => {
    setChecked(!checked);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFinish = (e) => {
    Axios.post("http://localhost:5000/api/posts/agregar", {
      title: title,
      description: description,
      categoria: "asdasd",
      ciudad: "asdasd",
      creator: "6172fc72cd04f94888531721",
      image: "asdasd",
    })
      .then((response) => {
        e.preventDefault();
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  function getStepContent(step) {
    console.log(step);
    switch (step) {
      case 0:
        return (
          <React.Fragment>
            <Box
              className="mainInformation"
              sx={{
                flex: "2",
                display: "flex",
                flexDirection: "column",
                padding: "1rem",
              }}
            >
              <TextField
                id="standard-basic"
                label="Titulo del post"
                variant="standard"
                style={{ flex: "1" }}
                value={title}
                onChange={handleTitleChange}
              />
              <TextField
                id="filled-multiline-static"
                label="Descripcion del Post"
                multiline
                rows={20}
                variant="standard"
                style={{ flex: "2" }}
                value={description}
                onChange={handleDescriptionChange}
              />
            </Box>
            <Box
              className="secondaryInformation"
              sx={{ flex: "1", padding: "1rem" }}
            >
              <Box>
                <FormControlLabel
                  control={
                    <Switch
                      checked={checked}
                      onChange={handleMoneyChange}
                      name="money"
                    />
                  }
                  label="Habilitar donaciones de dinero"
                />
                {checked && (
                  <TextField
                    id="outlined-number"
                    label="Monto"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              </Box>
              <Box></Box>
            </Box>
          </React.Fragment>
        );

      case 1:
        return (
          <React.Fragment>
            <Box
              className="secondaryInformation"
              sx={{
                flex: "2",
                display: "flex",
                flexDirection: "row",
                padding: "1rem",
              }}
            >
              <Box
                sx={{
                  flex: "1",
                  padding: "1rem",
                  backgroundColor: "red",
                }}
              >
                <ImageLoader />
              </Box>
              <Box
                sx={{
                  flex: "1",
                  padding: "1rem",
                  backgroundColor: "blue",
                }}
              >
                <Geocoder />
              </Box>
            </Box>
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <Box
              className="postReview"
              sx={{
                flex: "2",
                display: "flex",
                flexDirection: "row",
                padding: "1rem",
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignContent: "center",
                  flex: "2",
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
                      flex: "2",
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
                        <Typography variant="h2">{title}</Typography>
                        <ListItem>
                          <LocationOnIcon />
                          <Typography variant="h4">Ubicacion</Typography>
                        </ListItem>
                      </Box>
                      <Box sx={{ flex: "2" }}>
                        <Typography variant="p">{description}</Typography>
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
                            Categoria: Inmuebles
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: "1",
                            display: "flex",
                            flexDirection: "row",
                          }}
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
                </Paper>
              </Box>
            </Box>
          </React.Fragment>
        );
    }
  }
  return (
    <React.Fragment>
      <MainNavigation />
      <ErrorModal error={error} onClear={clearError} />
      <Box
        sx={{
          flex: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
        }}
      >
        <Box className="stepper" sx={{ pladding: "1rem", flex: "1" }}>
          {getStepContent(activeStep)}
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              {isLoading && <LoadingSpinner asOverlay />}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                Step {activeStep + 1}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {activeStep === steps.length - 1 ? (
                  <Button onClick={handleFinish}>Finish</Button>
                ) : (
                  <Button onClick={handleNext}>Next</Button>
                )}
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default CreatePost;
