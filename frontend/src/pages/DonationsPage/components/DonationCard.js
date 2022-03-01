import { Modal, Paper } from "@material-ui/core";
import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "../../../shared/context/UserContext";
import { useHttpClient } from "../../../shared/hooks/http-hook";

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
const DonationCard = (props) => {
  const [openModal, setopenModal] = useState(false);
  const handleModalClose = () => {
    setopenModal(false);
  };
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
      setopenModal(true);
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
      setopenModal(true);
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
          {props.donacion &&
            props.donation.state == "Pedido aceptado" &&
            props.recibido && (
              <Button onClick={handleRecibirPedido}>
                Marcar pedido como recibido
              </Button>
            )}
        </Box>
      </Paper>
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
            Operación exitosa!
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default DonationCard;
