import React, { useContext, useState } from "react";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import {
  FormControlLabel,
  IconButton,
  List,
  Paper,
  Switch,
  TextField,
} from "@material-ui/core";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  ImageList,
  ImageListItem,
  ListItem,
  Modal,
  Typography,
} from "@mui/material";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UiElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner";
import usePlacesAutocomplete from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";
import { UserContext } from "../../shared/context/UserContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";

//
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

function getSteps() {
  return ["Información Basica", "Imagenes y Ubicación", "Revisión"];
}

const CreatePost = () => {
  const auth = useContext(UserContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const steps = getSteps();
  const [activeStep, setActiveStep] = useState(0);
  const [checked, setChecked] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  //LIST
  const [items, setItems] = useState([]);
  const [itemToAdd, setItemToAdd] = useState("");
  const [itemAmount, setItemAmount] = useState("");

  const handleAddList = (e) => {
    let item = {
      item_name: itemToAdd,
      item_amount: itemAmount,
      already_donated: 0,
    };
    setItems((prevState) => [...prevState, item]);
  };
  const handleDeleteList = (e) => {
    const newNotes = items.filter((item) => item != e);
    setItems(newNotes);
  };
  const handleItemChange = (e) => {
    setItemToAdd(e.target.value);
  };
  const handleAmountChange = (e) => {
    setItemAmount(e.target.value);
  };

  //
  //MODAL SUCCESS
  const [open, setOpen] = useState(false);
  const handleMoneyClose = () => {
    setOpen(false);
  };
  //
  //POST SUCCESS CREATED CHECL
  let history = useHistory();

  const [postCreated, setPostCreated] = useState(null);
  const handleGoToPost = (e) => {
    if (postCreated.id) {
      history.push("/posts/" + postCreated.id);
    } else {
      window.location.reload();
    }
  };
  //
  //IMAGES
  const [file, setFile] = useState([null]);
  var fileObj = [];
  const [fileArray, setfileArray] = useState([]);

  const uploadMultipleFiles = (e) => {
    fileObj.push(e.target.files);

    for (let i = 0; i < fileObj[0].length; i++) {
      setfileArray((prevState) => [
        ...prevState,
        URL.createObjectURL(fileObj[0][i]),
      ]);
    }
    setFile({ file: fileArray });
    console.log(file);
  };

  const uploadFiles = (e) => {
    e.preventDefault();
    console.log(file);
  };
  //
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

  // GEOCODER
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete();

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = (val) => {
    setValue(val, false);
  };
  //
  const handleFinish = async (e) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/posts/agregar`,
        "POST",
        JSON.stringify({
          title: title,
          description: description,
          categoria: "asdasd",
          ciudad: value,
          creator: auth.userId,
          image: "image",
          items: items,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      console.log(responseData.post);
      setPostCreated(responseData.post);
    } catch (err) {
      console.log(err);
    }
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
              <Box className="items">
                <TextField
                  id="standard-basic"
                  label="¿Que necesita que le donen?"
                  variant="standard"
                  style={{ flex: "3" }}
                  onChange={handleItemChange}
                />
                <TextField
                  id="standard-basic"
                  label="¿Que cantidad?"
                  variant="standard"
                  style={{ flex: "1" }}
                  onChange={handleAmountChange}
                />
                <Button onClick={handleAddList}>Agregar</Button>
                {items ? (
                  <List>
                    {(items || []).map((i) => (
                      <ListItem
                        secondaryAction={
                          <IconButton edge="end" aria-label="delete">
                            <Button onClick={() => handleDeleteList(i)}>
                              <DeleteIcon />
                            </Button>
                          </IconButton>
                        }
                      >
                        <ListItemText
                          primary={`${i.item_name}(${i.item_amount})`}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="h2">Agregue el primer item!</Typography>
                )}
              </Box>
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
                <form>
                  <div className="form-group multi-preview">
                    {(fileArray || []).map((url) => (
                      <img src={url} alt="..." />
                    ))}
                  </div>

                  <div className="form-group">
                    <input
                      type="file"
                      className="form-control"
                      onChange={uploadMultipleFiles}
                      multiple
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger btn-block"
                    onClick={uploadFiles}
                  >
                    Upload
                  </button>
                </form>
              </Box>
              <Box
                sx={{
                  flex: "1",
                  padding: "1rem",
                  backgroundColor: "blue",
                }}
              >
                <Combobox onSelect={handleSelect} aria-labelledby="demo">
                  <ComboboxInput
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                  />
                  <ComboboxPopover>
                    <ComboboxList>
                      {status === "OK" &&
                        data.map(({ place_id, description }) => (
                          <ComboboxOption key={place_id} value={description} />
                        ))}
                    </ComboboxList>
                  </ComboboxPopover>
                </Combobox>
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
                          <Typography variant="h4">{value}</Typography>
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
                              {auth.userId}
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
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && postCreated ? (
        <Modal
          open={true}
          onClose={handleMoneyClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Post creado exitosamente!
            </Typography>
            <Button onClick={handleGoToPost}>Ir al post</Button>
          </Box>
        </Modal>
      ) : null}
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
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
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
                <Button onClick={handleFinish}>Finalizar</Button>
              ) : (
                <Button onClick={handleNext}>Siguiente</Button>
              )}
            </Box>
          </React.Fragment>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default CreatePost;
