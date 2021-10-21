import React from "react";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FormControlLabel, Paper, Switch, TextField } from "@material-ui/core";

function getSteps() {
  return ["Información Basica", "Imagenes y Ubicación", "Revisión"];
}

const CreatePost = () => {
  const steps = getSteps();
  const [activeStep, setActiveStep] = React.useState(0);
  const [checked, setChecked] = React.useState(false);

  const handleMoneyChange = (e) => {
    setChecked(!checked);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(step) {
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
              />
              <TextField
                id="filled-multiline-static"
                label="Descripcion del Post"
                multiline
                rows={20}
                variant="standard"
                style={{ flex: "2" }}
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
                label="Probando que funciona"
                variant="standard"
                style={{ flex: "1" }}
              />
              <TextField
                id="filled-multiline-static"
                label="Descripcion del Post"
                multiline
                rows={20}
                variant="standard"
                style={{ flex: "2" }}
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
    }
  }

  return (
    <React.Fragment>
      <MainNavigation />
      <Box
        className="mainContainer"
        sx={{
          height: "100%",
          display: "flex",
          alignContent: "center",
        }}
      >
        <Paper
          style={{
            width: "100%",
            margin: "2rem",
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
          }}
        >
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
            />
            <TextField
              id="filled-multiline-static"
              label="Descripcion del Post"
              multiline
              rows={20}
              variant="standard"
              style={{ flex: "2" }}
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
          <Box
            sx={{
              flex: "1",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            <Box className="stepper" sx={{ padding: "1rem", flex: "1" }}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
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
                    <Button onClick={handleNext}>
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </Box>
        </Paper>
      </Box>
    </React.Fragment>
  );
};

export default CreatePost;
