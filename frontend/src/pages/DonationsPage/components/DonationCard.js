import { Paper } from "@material-ui/core";
import { Box, Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../../../shared/context/UserContext";
import { useHttpClient } from "../../../shared/hooks/http-hook";

const DonationCard = (props) => {
  console.log(props);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const auth = useContext(UserContext);

  const handleTomarPedido = async (e) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/posts/donaciones/update/${props.donation.id}`,
        "POST",
        JSON.stringify({
          new_state: "Pedido aceptado",
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

  const handleRecibirPedido = async (e) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/posts/donaciones/update/${props.donation.id}`,
        "POST",
        JSON.stringify({
          new_state: "Pedido entregado",
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
    <Box sx={{ marginBottom: "1rem" }}>
      <Paper>
        <Box>
          <a href={`http://localhost:3000/posts/${props.donation.post}`}>
            <Typography>Post: {props.donation.post_name}</Typography>
          </a>
          <Typography>
            {props.donation.items.map((item) => {
              return (
                <Typography>
                  Item: {item.item_name}, cantidad: {item.item_amount}
                </Typography>
              );
            })}
          </Typography>
          <Typography>Estado: {props.donation.state}</Typography>
          {props.pedido && (
            <Button onClick={handleTomarPedido}>Tomar pedido</Button>
          )}
          {props.donacion && props.donation.state == "Pedido aceptado" && (
            <Button onClick={handleRecibirPedido}>
              Marcar pedido como recibido
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default DonationCard;
