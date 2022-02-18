import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "red",
    height: "15vh",
    margin: 0,
    width: "100%",
    overflow: "hidden",
  },
  span: {
    paddingLeft: 10,
  },
}));
const TestSponsor = () => {
  const classes = useStyles();
  const [coordinates, setCoordinates] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCoordinates((coordinates) => {
        if (coordinates >= 50) {
          return 0;
        }
        return coordinates + 0.1;
      });
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box className={classes.root}>
      <div style={{ transform: `translateX(${coordinates}%) ` }}>
        <img
          className="team-image"
          src="https://logodownload.org/wp-content/uploads/2014/04/McDonalds-logo-1.png"
          style={{ maxWidth: 200 }}
          alt="a"
        />
        <img
          className="team-image"
          src="https://logodownload.org/wp-content/uploads/2014/04/McDonalds-logo-1.png"
          style={{ maxWidth: 200 }}
          alt="a"
        />
        <img
          className="team-image"
          src="https://logodownload.org/wp-content/uploads/2014/04/McDonalds-logo-1.png"
          style={{ maxWidth: 200 }}
          alt="a"
        />
        <img
          className="team-image"
          src="https://logodownload.org/wp-content/uploads/2014/04/McDonalds-logo-1.png"
          style={{ maxWidth: 200 }}
          alt="a"
        />
        <img
          className="team-image"
          src="https://logodownload.org/wp-content/uploads/2014/04/McDonalds-logo-1.png"
          style={{ maxWidth: 200 }}
          alt="a"
        />
      </div>
    </Box>
  );
};

export default TestSponsor;
