import React, { useEffect, useState } from 'react';

import PostList from '../components/PostList';
import ErrorModal from '../../shared/components/UiElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UiElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../../shared/Utils/validators';


const Buscador = () => {
const [loadedPosts, setLoadedPosts] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
const [formState, inputHandler ] = useForm({
    categoria: {
        value: '',
        isValid:false
    }
}, false);

const formSubmitHandler =async (event) => {
    event.preventDefault();

    try{
        const categ = formState.inputs.categoria.value;
        console.log(categ);
        const responseData = await sendRequest(
          `http://localhost:5000/api/posts/categoria/${categ}`
        );
        setLoadedPosts(responseData.posts);

    }catch(err){

    }
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
          element="input"
          type="text"
          label="categoria"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Ingresar categoria valida"
          onInput={inputHandler}
        />
      {!isLoading && loadedPosts && (
        <PostList items={loadedPosts}  />
      )}
      <Button type="submit" >
         Buscar
        </Button>
      </form>
    </React.Fragment>
  );
    
};

export default Buscador;