import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./UserPage.css";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    margin: 0,
  },
  titulo: {
    height: "10vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "1vh",
    marginBottom: "1vh",
  },
}));

const UserPage = () => {
  const classes = useStyles();

  return (
    <div className="mainContainer">
      <div className="backgroundImage"></div>
      <div className="mainCard">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          dolorem consequatur, repellendus asperiores deleniti, itaque eveniet
          nulla quae debitis dolorum deserunt quis temporibus similique,
          delectus inventore. Fugit similique sapiente dicta.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          dolorem consequatur, repellendus asperiores deleniti, itaque eveniet
          nulla quae debitis dolorum deserunt quis temporibus similique,
          delectus inventore. Fugit similique sapiente dicta.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          dolorem consequatur, repellendus asperiores deleniti, itaque eveniet
          nulla quae debitis dolorum deserunt quis temporibus similique,
          delectus inventore. Fugit similique sapiente dicta.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          dolorem consequatur, repellendus asperiores deleniti, itaque eveniet
          nulla quae debitis dolorum deserunt quis temporibus similique,
          delectus inventore. Fugit similique sapiente dicta.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          dolorem consequatur, repellendus asperiores deleniti, itaque eveniet
          nulla quae debitis dolorum deserunt quis temporibus similique,
          delectus inventore. Fugit similique sapiente dicta.
        </p>
        <div className="imageSection">
          <img src="./img_avatar.png" alt="" />
        </div>
        <div className="topCard"></div>
      </div>
      <div className="postListCard"></div>
    </div>
  );
};

export default UserPage;
