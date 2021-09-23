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
import { UserContext } from "../../../../Context/UserContext";
import Axios from "axios";
import { useHistory } from "react-router-dom";

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  const [usernameReg, setUsernameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const auth = useContext(UserContext);
  let history = useHistory();

  const signup = (e) => {
    Axios.post("http://localhost:5000/api/users/signup", {
      name: usernameReg,
      email: emailReg,
      password: passwordReg,
    })
      .then((response) => {
        e.preventDefault();
        console.log(response);
        console.log(response.data);
        auth.login(response.data.userId, response.data.token);
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
          type="text"
          placeholder="Full Name"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <Input type="password" placeholder="Confirm Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="text" onClick={signup}>
        Registrarse
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink>
        ¿Ya tienes una cuenta?
        <BoldLink onClick={switchToSignin}>Ingresar</BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
