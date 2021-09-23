import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/Utils/validators";
import "./AgregarPost.css";
import { useForm } from "../../shared/hooks/form-hook";
import CardPost from "../../shared/components/UiElements/CardPost";

const DUMMY_POSTS = [
  {
    id: "p1",
    title: "un titulo",
    description: "una descripcion cualquiera",
    Image:
      "https://elgourmet.s3.amazonaws.com/recetas/share/88fa3ca583e136398d5f84e8c4cf9e37_3_3_photo.png",
    name: "cama",
    ciudad: "La Plata",
    categoria: "Muebles",
  },
  {
    id: "p2",
    title: "un titulo segundo",
    description: "otra descripcion cualquiera",
    Image:
      "https://elgourmet.s3.amazonaws.com/recetas/share/88fa3ca583e136398d5f84e8c4cf9e37_3_3_photo.png",
    name: "cama2",
    ciudad: "Berisso",
    categoria: "Muebles",
  },
  {
    id: "p3",
    title: "algun otro titulo mas",
    description: "otra descripcion cualquiera diferente a la anterior",
    Image:
      "https://elgourmet.s3.amazonaws.com/recetas/share/88fa3ca583e136398d5f84e8c4cf9e37_3_3_photo.png",
    name: "cama2",
    ciudad: "Quilmes",
    categoria: "Muebles",
  },
  {
    id: "p4",
    title: "un titulo cuarto me canse",
    description: "otra descripcion cualquiera vvvvvvvv",
    Image:
      "https://elgourmet.s3.amazonaws.com/recetas/share/88fa3ca583e136398d5f84e8c4cf9e37_3_3_photo.png",
    name: "cama2",
    ciudad: "Ranchos",
    categoria: "Transporte",
  },
];

const UpdatePost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const postid = useParams().postid;

  const [formState, inputHandler, setFormData] = useForm(
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
        isValid: "",
      },
    },
    false
  );

  const identifiedPost = DUMMY_POSTS.find((p) => p.id === postid);
  useEffect(() => {
    if (identifiedPost) {
      setFormData(
        {
          title: {
            value: identifiedPost.title,
            isValid: true,
          },
          description: {
            value: identifiedPost.description,
            isValid: true,
          },
          ciudad: {
            value: identifiedPost.ciudad,
            isValid: true,
          },
          categoria: {
            value: identifiedPost.categoria,
            isValid: true,
          },
        },
        true
      );
    }

    setIsLoading(false);
  }, [setFormData, identifiedPost]);

  const postUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPost) {
    return (
      <div className="center">
        <CardPost>
        <h2>No se encontro post</h2>
        </CardPost>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Cargando...</h2>
      </div>
    );
  }
  return (
    <form className="place-form" onSubmit={postUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="titulo"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Ingresar titulo valido"
        onInput={inputHandler}
        value={formState.inputs.title.value}
        valid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        type="text"
        label="descrapcion"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Ingresar descripcion valida"
        onInput={inputHandler}
        value={formState.inputs.description.value}
        valid={formState.inputs.description.isValid}
      />
      <Input
        id="categoria"
        element="input"
        type="text"
        label="categoria"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Ingresar categoria valida"
        onInput={inputHandler}
        value={formState.inputs.categoria.value}
        valid={formState.inputs.categoria.isValid}
      />
      <Input
        id="ciudad"
        element="input"
        type="text"
        label="ciudad"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Ingresar ciudad valida"
        onInput={inputHandler}
        value={formState.inputs.ciudad.value}
        valid={formState.inputs.ciudad.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Actualizar post
      </Button>
    </form>
  );
};

export default UpdatePost;
