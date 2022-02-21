import { Paper } from "@material-ui/core";
import { Box, Typography } from "@mui/material";
import React from "react";

const DonationCard = (props) => {
  console.log(props);
  return (
    <Box sx={{ marginBottom: "1rem" }}>
      <a href={`http://localhost:3000/posts/${props.donation.post}`}>
        <Paper>
          <Box>
            <Typography>{props.donation.post_name}</Typography>
            <Typography>Items</Typography>
            <Typography>Estado: {props.donation.state}</Typography>
          </Box>
        </Paper>
      </a>
    </Box>
  );
};

export default DonationCard;
