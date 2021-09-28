import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import GridItem from "./GridItem";

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
    img:
      "https://media-exp1.licdn.com/dms/image/C4E03AQGw8g2no_A_eQ/profile-displayphoto-shrink_800_800/0/1611665928413?e=1625097600&v=beta&t=ylzbgwfLZpnAeJktjU67fD5S1NgG7pkGCwBb3Y6NuU0",
  },
  {
    name: "Ruf Carolina",
    rol: "CEO",
    mail: "carolinaruf98@gmail.com",
    linkedin: "carolina-ruf-4ab55315b",
    img:
      "https://media-exp1.licdn.com/dms/image/C4D03AQHpI-X8MHatUQ/profile-displayphoto-shrink_800_800/0/1604094250727?e=1625097600&v=beta&t=b8Rs6WXda7inzKpXmnLRwkFGMW_RWdWLzey93pGfwg0",
  },
  {
    name: "Fiorotto Leandro",
    rol: "FEO",
    mail: "leo.fiorotto@hotmail.com",
    linkedin: "leandro-fiorotto-595a3220a",
    img:
      "https://media-exp1.licdn.com/dms/image/C5603AQHqcXb6FwKZHQ/profile-displayphoto-shrink_800_800/0/1619375247866?e=1625097600&v=beta&t=AiTYIWVCpBW4vMlZZGJvMWCv29whWndPaVGfDzdTIU4",
  },
  {
    name: "Maximiliano Kapko",
    rol: "CTO",
    mail: "maxi.kapko73@gmail.com",
    linkedin: "maximiliano-kapko-55b050173",
    img:
      "https://media-exp1.licdn.com/dms/image/C4D03AQGMTxzBqRinPg/profile-displayphoto-shrink_800_800/0/1539445995310?e=1625097600&v=beta&t=3ArEyqWiPsYh13x2mKTXpqjvSnRqcgdSweCAVGZAZso",
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
