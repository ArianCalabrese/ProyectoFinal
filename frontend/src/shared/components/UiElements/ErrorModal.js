import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      header="Ocurrio un Error!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Aceptar</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
