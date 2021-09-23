import React, { useState } from "react";

import Posts from "../pages/Posts";
import CardPost from "../../shared/components/UiElements/CardPost";
import AvatarPost from "../../shared/components/UiElements/AvatarPost";
import { Link } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UiElements/Modal";
import "./PostItem.css";

const PostItem = (props) => {
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("BORRANDO");
  };

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.ciudad}
        contentClass="palce-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>Cerrar</Button>}
      >
        <div className="map-container">Mapa</div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="estas seguro?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>Cancelar</Button>
            <Button danger onClick={confirmDeleteHandler}>Borrar</Button>
          </React.Fragment>
        }
      >
        <p>Continuar con el borrado del post????</p>
      </Modal>
      <li className="user-item">
        <CardPost>
          <div>
            <AvatarPost image={props.image} alt={props.name} />
          </div>
          <div>
            <h2>{props.name}</h2>
            <h3>{props.ciudad}</h3>
            <h3>{props.categoria}</h3>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              Mapa
            </Button>
            <Button edit to={`/posts/${props.id}`}>
              Editar
            </Button>
            <Button danger onClick={showDeleteWarningHandler}>Borrar</Button>
          </div>
        </CardPost>
      </li>
    </React.Fragment>
  );
};

export default PostItem;
