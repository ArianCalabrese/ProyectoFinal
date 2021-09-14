import React from "react";
import "./AuthPage.scss";
import { Login } from "./components/login/index";

function AuthPage() {
  return (
    <div className="AuthPage">
      <Login />
    </div>
  );
}

export default AuthPage;
// import React, { useEffect, useState, useContext } from "react";
// import clsx from "clsx";
// import { ThemeProvider } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
// import Card from "@material-ui/core/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import Input from "@material-ui/core/Input";
// import FilledInput from "@material-ui/core/FilledInput";
// import OutlinedInput from "@material-ui/core/OutlinedInput";
// import InputLabel from "@material-ui/core/InputLabel";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import FormControl from "@material-ui/core/FormControl";
// import TextField from "@material-ui/core/TextField";
// import Visibility from "@material-ui/icons/Visibility";
// import VisibilityOff from "@material-ui/icons/VisibilityOff";

// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//       width: "25ch",
//     },
//   },
// }));

// const AuthPage = () => {
//   const classes = useStyles();
//   const [values, setValues] = React.useState({
//     amount: "",
//     password: "",
//     weight: "",
//     weightRange: "",
//     showPassword: false,
//   });

//   const handleChange = (prop) => (event) => {
//     setValues({ ...values, [prop]: event.target.value });
//   };

//   const handleClickShowPassword = () => {
//     setValues({ ...values, showPassword: !values.showPassword });
//   };

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <Card>
//       <Typography component="div">
//         <Typography variant="h3" component="h2" align="center">
//           Bienvenido
//         </Typography>
//         <Typography variant="h5" component="h2" align="center">
//           Ingrese sus datos para continuar
//         </Typography>
//       </Typography>
//       <TextField label="Size" id="filled-size-small" size="small" />
//       <FormControl className={clsx(classes.margin, classes.textField)}>
//         <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
//         <Input
//           id="standard-adornment-password"
//           type={values.showPassword ? "text" : "password"}
//           value={values.password}
//           onChange={handleChange("password")}
//           endAdornment={
//             <InputAdornment position="end">
//               <IconButton
//                 aria-label="toggle password visibility"
//                 onClick={handleClickShowPassword}
//                 onMouseDown={handleMouseDownPassword}
//               >
//                 {values.showPassword ? <Visibility /> : <VisibilityOff />}
//               </IconButton>
//             </InputAdornment>
//           }
//         />
//       </FormControl>
//       <Typography variant="h5" component="h5" align="center">
//         ¿Aun no tiene una cuenta? Registrese
//       </Typography>
//     </Card>
//   );
// };

// export default AuthPage;
