import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import Axios from "axios";
import { UserContext } from "../../../../Context/UserContext";
import { useHistory } from "react-router-dom";

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  //Authentication
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const auth = useContext(UserContext);
  let history = useHistory();

  const login = (e) => {
    Axios.post("http://localhost:5000/api/users/login", {
      email: usernameReg,
      password: passwordReg,
    })
      .then((response) => {
        e.preventDefault();
        console.log(response);
        console.log(response.data);
        auth.login(response.data.userId, response.data.token);
        // console.log(response);
        // setUser("Pete de mierda");
        // console.log(response.data);
        // console.log(user);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Olvidaste tu contraseña?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="text" onClick={login}>
        Ingresar
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink>
        ¿No tienes una cuenta?
        <BoldLink onClick={switchToSignup}>Registrarse</BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
