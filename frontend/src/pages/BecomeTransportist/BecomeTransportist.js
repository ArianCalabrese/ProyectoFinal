import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Modal,
  Select,
} from "@material-ui/core";
import { Box, Paper, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import { UserContext } from "../../shared/context/UserContext";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UiElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner";

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

const BecomeTransportist = () => {
  const [openModal, setopenModal] = useState(false);
  const handleModalClose = () => {
    setopenModal(false);
  };
  const auth = useContext(UserContext);
  const [patente, setPatente] = useState("");
  const [tipo, setTipo] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [value, onChange] = useState(["10:00", "11:00"]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  let dias = [
    { dia: "Lunes", check: false },
    { dia: "Martes", check: false },
    { dia: "Miercoles", check: false },
    { dia: "Jueves", check: false },
    { dia: "Viernes", check: false },
    { dia: "Sabado", check: false },
    { dia: "Domingo", check: false },
  ];
  const [diasSeleccionados, setDias] = useState([]);

  const handlePatenteChange = (e) => {
    setPatente(e.target.value);
  };
  const handleTipoChange = (e) => {
    setTipo(e.target.value);
  };
  const handleMarcaChange = (e) => {
    setMarca(e.target.value);
  };
  const handleModeloChange = (e) => {
    setModelo(e.target.value);
  };
  const onChangeDiasSeleccionados = (e, isChecked, value) => {
    console.log(e);
    if (isChecked) {
      setDias((prevState) => [...prevState, value]);
    } else {
      const days = diasSeleccionados.filter((item) => item == value);
      setDias(days);
    }
    console.log(diasSeleccionados);
  };

  const handleSubmitTransportista = async (e) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/users/transportist/${auth.userId}`,
        "POST",
        JSON.stringify({
          patente: patente,
          tipo_vehiculo: tipo,
          marca: marca,
          modelo: modelo,
          dias_habiles: ["Lunes", "Miercoles", "Viernes"],
          horarios_habiles: value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setopenModal(true);
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <MainNavigation />
      <Box>
        <Typography variant="h4">
          Complete el formulario para volverse transportista
        </Typography>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ flex: "1" }}>
            <TextField
              id="standard-basic"
              label="Patente del vehiculo"
              variant="standard"
              onChange={handlePatenteChange}
            />
            <Select
              labelId="demo-simple-select-label"
              id="standard-basic"
              value={tipo}
              label="Tipo de vehiculo"
              onChange={handleTipoChange}
            >
              <MenuItem value={"Auto"}>Auto</MenuItem>
              <MenuItem value={"Camion"}>Camion</MenuItem>
              <MenuItem value={"Camioneta"}>Camioneta</MenuItem>
            </Select>
          </Box>
          <Box sx={{ flex: "1" }}>
            <TextField
              id="standard-basic"
              label="Marca"
              variant="standard"
              onChange={handleMarcaChange}
            />
            <TextField
              id="standard-basic"
              label="Modelo"
              variant="standard"
              onChange={handleModeloChange}
            />
          </Box>
          <Box sx={{ flex: "1" }}>
            {dias.map((d) => {
              return (
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={d.check}
                    onChange={onChangeDiasSeleccionados}
                  />
                  {d.dia}
                </label>
              );
            })}
          </Box>
          <TimeRangePicker onChange={onChange} value={value} />
          <Button onClick={handleSubmitTransportista}>Aplicar</Button>
        </Paper>
      </Box>
      <Modal open={openModal} onClose={handleModalClose} style={style}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "10rem",
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Modificado con exito!
          </Typography>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default BecomeTransportist;
