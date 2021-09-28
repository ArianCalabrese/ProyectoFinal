import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import MoneyOffIcon from "@material-ui/icons/MoneyOff";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import yellow from "@material-ui/core/colors/yellow";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 480,
  },
  pos: {
    padding: "auto",
    textAlign: "center",
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginLeft: "0",
    marginRight: "0",
    width: "100%",
  },
}));
const Mision = () => {
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Motivaciones:
        </Typography>
        <Typography variant="body2" component="p">
          #NombreApp# surge como una idea universitaria a raiz de la profunda
          necesidad de miles de personas
        </Typography>
        <Typography variant="h5" component="h2">
          Vision, Mision y Valores:
        </Typography>
        <Typography variant="body2" component="p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas quisquam
          consectetur eligendi iure. Vel nulla beatae optio veritatis doloremque
          harum a dolorum id. Fuga explicabo iste laboriosam quia nesciunt
          deleniti! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Accusamus similique vitae totam quam neque optio delectus illum quia.
          Ullam nihil odio reiciendis deserunt. Adipisci enim quam nobis
          eligendi quos voluptate.
        </Typography>
        <Typography variant="h5" component="h2">
          Objetivos especificos
        </Typography>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item lg>
              <Card>
                <Typography variant="h5" component="h2" className={classes.pos}>
                  Alcance Nacional
                </Typography>

                <LocalShippingIcon
                  className={classes.large}
                  style={{ color: grey[600] }}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    component="p"
                    className={classes.pos}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eius maiores consectetur, deleniti corporis qui voluptas
                    porro. Aliquid quae magnam exercitationem sunt voluptas
                    quis, consectetur tempore, recusandae suscipit esse neque
                    reiciendis?
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg>
              <Card>
                <Typography variant="h5" component="h2" className={classes.pos}>
                  Sin Costo
                </Typography>
                <MoneyOffIcon
                  className={classes.large}
                  style={{ color: red[600] }}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    component="p"
                    className={classes.pos}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eius maiores consectetur, deleniti corporis qui voluptas
                    porro. Aliquid quae magnam exercitationem sunt voluptas
                    quis, consectetur tempore, recusandae suscipit esse neque
                    reiciendis?
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg>
              <Card>
                <Typography variant="h5" component="h2" className={classes.pos}>
                  Transformar Realidades
                </Typography>

                <EmojiEmotionsIcon
                  className={classes.large}
                  style={{ color: yellow[600] }}
                />

                <CardContent>
                  <Typography
                    variant="body2"
                    component="p"
                    className={classes.pos}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eius maiores consectetur, deleniti corporis qui voluptas
                    porro. Aliquid quae magnam exercitationem sunt voluptas
                    quis, consectetur tempore, recusandae suscipit esse neque
                    reiciendis?
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
};

export default Mision;
