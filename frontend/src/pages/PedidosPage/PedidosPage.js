import React, { useContext, useEffect, useState } from "react";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UiElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner";
import DonationCard from "../DonationsPage/components/DonationCard";
import { Box, Paper, Typography } from "@material-ui/core";
import { UserContext } from "../../shared/context/UserContext";

const PedidosPage = () => {
  const auth = useContext(UserContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [donaciones, setDonaciones] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/posts/donaciones`
        );
        console.log(responseData.donations);
        const newNotes = responseData.donations.filter(
          (donation) => donation.state == "En espera"
        );
        setDonaciones(newNotes);
        const responseUserData = await sendRequest(
          `http://localhost:5000/api/users/id/${auth.userId}`
        );
        setUser(responseUserData.user);
        console.log(responseUserData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <MainNavigation />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && user && user.es_transportista ? (
        <Box
          className="vehicle-info"
          sx={{ padding: "1rem", margin: "0 1rem" }}
        >
          <Paper>
            <Box>
              <Typography variant="h5">
                Vehiculo: {user.marca} {user.modelo}
              </Typography>
              <Typography variant="h5">
                Tipo de vehiculo:{user.tipo_vehiculo}
              </Typography>
              <Typography variant="h5">Patente:{user.patente}</Typography>
              <Typography variant="h5">
                Dias habiles: {user.dias_habiles.toString()}
              </Typography>
              <Typography variant="h5">
                Horario disponible: {user.horarios_habiles.toString()}
              </Typography>
            </Box>
          </Paper>
        </Box>
      ) : (
        <Box
          className="vehicle-info"
          sx={{ padding: "1rem", margin: "0 1rem" }}
        >
          <Paper>
            <Box>
              <Typography variant="h3">Usted no es transportista!</Typography>
            </Box>
          </Paper>
        </Box>
      )}

      {!isLoading && donaciones && user && user.es_transportista ? (
        donaciones.map((val) => {
          return <DonationCard donation={val} pedido={true} />;
        })
      ) : (
        <Box
          className="vehicle-info"
          sx={{ padding: "1rem", margin: "0 1rem" }}
        >
          <Paper>
            <Box>
              <Typography variant="h3">
                No hay ninguna donacion que requiera transporte!
              </Typography>
            </Box>
          </Paper>
        </Box>
      )}
    </React.Fragment>
  );
};

export default PedidosPage;
