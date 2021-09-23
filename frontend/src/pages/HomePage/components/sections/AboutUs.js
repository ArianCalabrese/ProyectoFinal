import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import GridItem from "./GridItem";
import avatar1 from "../../images/arian.jpg";

import avatar2 from "../../images/caro.jpg";

import avatar3 from "../../images/fioro.jpg";

import avatar4 from "../../images/maxi.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: 100,
    paddingRight: 100,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const ownersInfo = [
  {
    name: "Calabrese Arian",
    rol: "Developer",
    mail: "ariancalabrese@hotmail.com",
    linkedin: "ariancalabrese",
    img: avatar1,
    description:
      "23 años, Ranchos, Provincia de Buenos Aires. Estudiante de Ingenieria en Sistemas de Información en la Universidad Tecnológica Nacional (UTN).",
  },
  {
    name: "Ruf Carolina",
    rol: "CEO",
    mail: "carolinaruf98@gmail.com",
    linkedin: "carolina-ruf-4ab55315b",
    img: avatar2,
    description: "ariancalabrese",
  },
  {
    name: "Fiorotto Leandro",
    rol: "FEO",
    mail: "leo.fiorotto@hotmail.com",
    linkedin: "leandro-fiorotto-595a3220a",
    img: avatar3,
    description: "ariancalabrese",
  },
  {
    name: "Maximiliano Kapko",
    rol: "CTO",
    mail: "maxi.kapko73@gmail.com",
    linkedin: "maximiliano-kapko-55b050173",
    img: avatar4,
    description: "ariancalabrese",
  },
];
const AboutUs = () => {
  const classes = useStyles();

  const ownersItems = ownersInfo.map((owner) => (
    <Grid item xs>
      <GridItem
        name={owner.name}
        rol={owner.rol}
        mail={owner.mail}
        linkedin={owner.linkedin}
        img={owner.img}
        description={owner.description}
      />
    </Grid>
  ));

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        {ownersItems}
      </Grid>
    </div>
  );
};

export default AboutUs;
