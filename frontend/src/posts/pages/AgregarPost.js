import React, { useCallback, useReducer } from "react";

import "./AgregarPost.css";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/Utils/validators";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";

const NuevoPost = () => {
  const [formState, InputHandler] =  useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      ciudad: {
        value: "",
        isValid: false,
      },
      categoria: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  

  const postSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className="place-form" onSubmit={postSubmitHandler}>
      <h1>Agregar Post</h1>
      <Input
        id="title"
        element="input"
        type="text"
        label="title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Ingresar titulo valido"
        onInput={InputHandler}
      />
      <Input
        id="description"
        element="textarea"
        type="text"
        label="description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Ingresar descripcion valida"
        onInput={InputHandler}
      />
      <Input
        id="ciudad"
        element="input"
        type="text"
        label="ciudad"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Ingresar ciudad valida"
        onInput={InputHandler}
      />
      <Input
        id="categoria"
        element="input"
        type="text"
        label="categoria"
        validators={[VALIDATOR_REQUIRE]}
        errorText="Ingresar ciudad valida"
        onInput={InputHandler}
      />

      <Button type="submit" disabled={!formState.isValid}>
        Agregar
      </Button>
    </form>
  );
};

export default NuevoPost;
