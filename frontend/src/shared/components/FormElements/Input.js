import React, { useReducer, useEffect } from "react";

import "./Input.css";
import { validate } from "../../Utils/validators";
import { SettingsInputSvideoSharp } from "@material-ui/icons";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || "",
    isTouched: false,
    isValid: props.valid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    props.onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);
  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  var element = "";
  if (props.element === "input") {
    element = (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );
  } else if (props.element === "textarea") {
    element = (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );
  } else if (props.element === "select_categoria") {
    element = (
      
      <select
        id={props.id}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      >
        <option value="">Seleccione</option>
        <option value="Mueble">Mueble</option>
        <option value="Alimento">Alimento</option>
        <option value="Transporte">Transporte</option>
      </select>
      
    );
  } else if (props.element === "select_ciudad") {
    element = (
      
      <select
        className='select_ciudad'
        id={props.id}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      >
        <option value="">Seleccione</option>
        <option value="La Plata">La Plata</option>
        <option value="Berisso">Berisso</option>
        <option value="Ensenada">Ensenada</option>
      </select>
      
    );
  }

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
