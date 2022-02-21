import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";
import { Box, Paper, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import { UserContext } from "../../shared/context/UserContext";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UiElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner";

const BecomeTransportist = () => {
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
            <TextField
              id="standard-basic"
              label="Tipo de vehiculo"
              variant="standard"
              onChange={handleTipoChange}
            />
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
    </React.Fragment>
  );
};

export default BecomeTransportist;
