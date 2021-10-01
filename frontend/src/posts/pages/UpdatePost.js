import React, { useEffect, useReducer, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

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
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UiElements/ErrorModal";
import { AuthContext} from '../../shared/context/auth-context';

const UpdatePost = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPost, setLoadedPost] = useState();
  const history = useHistory();
  const postid = useParams().postid;
console.log(auth);
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

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/posts/${postid}`
        );
        setLoadedPost(responseData.post);
        setFormData(
          {
            title: {
              value: responseData.post.title,
              isValid: true,
            },
            description: {
              value: responseData.post.description,
              isValid: true,
            },
            ciudad: {
              value: responseData.post.ciudad,
              isValid: true,
            },
            categoria: {
              value: responseData.post.categoria,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPost();
  }, [sendRequest, postid, setFormData]);

  const postUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(`http://localhost:5000/api/posts/${postid}`,'PATCH', JSON.stringify({
      title: formState.inputs.title.value,
      description: formState.inputs.description.value,
      ciudad: formState.inputs.ciudad.value,
      categoria: formState.inputs.categoria.value,
      creator: auth.userId
    }),{
      'Content-Type': 'application/json',
      "Authorization" : 'Bearer ' + auth.token 
    });
    history.push('/' + auth.userId + '/posts');
    }catch (err){

    }
    
    
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  if (!loadedPost && !error) {
    return (
      <div className="center">
        <CardPost>
          <h2>No se encontro post</h2>
        </CardPost>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      {!isLoading && loadedPost && (
        <form className="place-form" onSubmit={postUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="titulo"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Ingresar titulo valido"
            onInput={inputHandler}
            value={loadedPost.title}
            valid={true}
          />
          <Input
            id="description"
            element="textarea"
            type="text"
            label="descrapcion"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Ingresar descripcion valida"
            onInput={inputHandler}
            value={loadedPost.description}
            valid={true}
          />
          <Input
            id="categoria"
            element="select_categoria"
            type="text"
            label="categoria"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Ingresar categoria valida"
            onInput={inputHandler}
            value={loadedPost.categoria}
            valid={true}
          />
          <Input
            id="ciudad"
            element="select_ciudad"
            type="text"
            label="ciudad"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Ingresar ciudad valida"
            onInput={inputHandler}
            value={loadedPost.ciudad}
            valid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Actualizar post
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePost;
