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
          CALM surge como una idea universitaria a raiz de la profunda necesidad
          de miles de personas de tener un canal centralizado de informacion
          para poder solicitar o enviar donaciones. De esta manera, poder
          colaborar ofreciendo una plataforma para que quienes tengan interes en
          colaborar con otras personas/agrupaciones puedan hacerlo a traves de
          nuestra aplicacion sin problemas.
        </Typography>
        <Typography variant="h5" component="h2">
          Vision, Mision y Valores:
        </Typography>
        <Typography variant="body2" component="p">
          El objetivo de CALM es llegar a ser la plataforma más grande de
          latinoamerica en gestionar y centralizar donaciones a traves de toda
          la región. CALM busca contribuir a la sociedad creando esta aplicación
          sin fines de lucro, poniendo a su disposición publicaciones seguras y
          confiables para que utilicen aquellos que deseen colaborar con una
          causa en particular o, para aquellas personas que tengan la necesidad
          de ser ayudadas y/o ayudar a otros. Cuando hablamos de nuestros
          valores, hacemos referencia a los siguientes:
          <Typography variant="body3" component="p">
            Transparencia: La transparencia implica ser claros en la descripción
            de los servicios y no esconder información que puede ser relevante
            para los usuarios.
          </Typography>
          <Typography variant="body3" component="p">
            Honestidad: Estamos dispuestos a anteponer la sinceridad a cualquier
            otra consideración, aunque ello le perjudique comercialmente.
          </Typography>
          <Typography variant="body3" component="p">
            Libertad: Entendemos la libertad como la posibilidad de poder
            formular una opinión o de proponer una determinada actuación sin
            temor a ser reprendidos por ello.
          </Typography>
          <Typography variant="body3" component="p">
            Diligencia: La capacidad para ponerse manos a la obra sin dejar
            pasar el tiempo y sin sentir pereza.
          </Typography>
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
                    Pensamos CALM como una aplicacion que pueda utilizar
                    cualquier persona del pais, y que pueda coordinar con su
                    contraparte envios de articulos a traves de todo el pais.
                    Para ello, llevamos adelante un sistema de gestion de envios
                    con usuarios comprometidos a brindar su servicio de
                    transporte que pueden utilizar o, por otra parte, se le da
                    la libertad de elegir a traves de que medio desea
                    transportar la mercaderia.
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
                    Publicar en nuestra aplicación no tiene ningun costo.
                    Tenemos en consideración que quienes recurren a esta
                    plataforma es porque precisan ayuda y nosotros no vamos a
                    interferir negativamente en esa solicitud.
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
                    A fin de cuentas, lo unico que busca el equipo de CALM es
                    llevar adelante un lugar con informacion centralizada en el
                    que podamos ayudar a quienes desean colaborar con otras
                    personas y, a quienes esten en situacion de necesidad.
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
