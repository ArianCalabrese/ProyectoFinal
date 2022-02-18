import React, { useEffect, useState } from "react";
import ErrorModal from "../shared/components/UiElements/ErrorModal";
import LoadingSpinner from "../shared/components/UiElements/LoadingSpinner";
import { useHttpClient } from "../shared/hooks/http-hook";
import Input from "../shared/components/FormElements/Input";
import Button from "../shared/components/FormElements/Button";
import { useForm } from "../shared/hooks/form-hook";
import PostList from "./CreatePost/components/PostList";

const Buscador = () => {
  const [loadedPosts, setLoadedPosts] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      categoria: {
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

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const categ = formState.inputs.categoria.value;
      const ciudad = formState.inputs.ciudad.value;
      if(categ !== '' && ciudad === ''){
        
      console.log(categ);
      const responseData = await sendRequest(
        `http://localhost:5000/api/posts/categoria/${categ}`
      );
      setLoadedPosts(responseData.posts);
      }else if(ciudad !== '' && categ === ''){
  
        console.log(ciudad);
        const responseData = await sendRequest(
          `http://localhost:5000/api/posts/ciudad/${ciudad}`
        );
        setLoadedPosts(responseData.posts);
      }else if (ciudad !== '' && categ !== ''){
        console.log(ciudad);
        console.log(categ);
        const responseData = await sendRequest(
          `http://localhost:5000/api/posts/buscar/${categ}/${ciudad}`
        );
        setLoadedPosts(responseData.posts);
      }
      
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={formSubmitHandler}>
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        <Input
          id="categoria"
          element="select_categoria"
          type="select"
          label="categoria"
          validators={[]}
          errorText=""
          onInput={inputHandler}
        />
         <Input
          id="ciudad"
          element="select_ciudad"
          type="select"
          label="ciudad"
          validators={[]}
          errorText=""
          onInput={inputHandler}
        />
        <Button type="submit">Buscar</Button>
        {!isLoading && loadedPosts && <PostList items={loadedPosts} />}
      </form>
    </React.Fragment>
  );
};

export default Buscador;