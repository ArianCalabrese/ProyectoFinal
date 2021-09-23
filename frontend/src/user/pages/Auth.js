import React, { useState } from "react";

import "./Auth.css";
import Card from "../../shared/components/UiElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/Utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import ErrorModal from "../../shared/components/UiElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner";
//import { set } from "js-cookie";

const Auth = () => {
  const [isLoginMode, setIsLoguinMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          ciudad: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          ciudad: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoguinMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (isLoginMode) {
      try {
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        
        setIsLoguinMode(true);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message || "Algo paso, intentalo de nuevo");
      }
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            ciudad: formState.inputs.ciudad.value,
          }),
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        
        setIsLoguinMode(true);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message || "Algo paso, intentalo de nuevo");
      }
    }
  };

  const errorHandler = () => {
    setError(null);
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login requerido</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="nombre"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="ingresar nombre"
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="ingresar email valido"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="ingresar un password valido, minimo 6 caracteres"
            onInput={inputHandler}
          />
          {!isLoginMode && (
            <Input
              element="input"
              id="ciudad"
              type="text"
              label="ciudad"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="ingresar ciudad"
              onInput={inputHandler}
            />
          )}
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "Login" : "Registrarse"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          Cambiar a {isLoginMode ? "Registrarse" : "Login"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
