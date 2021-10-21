import React, { useContext } from "react";

import "./AgregarPost.css";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/Utils/validators";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UiElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { UserContext } from "../../Context/UserContext";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
const NuevoPost = () => {
  //const auth = useContext(AuthContext);
  const auth = useContext(UserContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, InputHandler] = useForm(
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
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const postSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("categoria", formState.inputs.categoria.value);
      formData.append("ciudad", formState.inputs.ciudad.value);
      formData.append("creator", auth.userId);
      formData.append("image", formState.inputs.image.value);
      await sendRequest(
        "http://localhost:5000/api/posts/agregar",
        "POST",
        formData,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <MainNavigation />
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={postSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
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
        <ImageUpload
          id="image"
          onInput={InputHandler}
          errorText="Por favor, agregue una imagen"
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
          element="select_ciudad"
          type="select"
          label="ciudad"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Ingresar ciudad valida"
          onInput={InputHandler}
        />
        <Input
          id="categoria"
          element="select_categoria"
          type="select"
          label="categoria"
          validators={[VALIDATOR_REQUIRE]}
          errorText="Ingresar ciudad valida"
          onInput={InputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          Agregar
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NuevoPost;
