import React, { useState, useContext } from "react";

import CardPost from "../../../shared/components/UiElements/CardPost";
import AvatarPost from "../../../shared/components/UiElements/AvatarPost";
import { Link } from "react-router-dom";
import Button from "../../../shared/components/FormElements/Button";
import Modal from "../../../shared/components/UiElements/Modal";
import "./PostItem.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import ErrorModal from "../../../shared/components/UiElements/ErrorModal";
import LoadingSpinner from "../../../shared/components/UiElements/LoadingSpinner";
import { UserContext } from "../../../shared/context/UserContext";

const PostItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(UserContext);
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

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/posts/${props.id}`,
        "DELETE",
        JSON.stringify({
          creator: auth.userId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      props.onDelete(props.id);
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
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
            <Button inverse onClick={cancelDeleteHandler}>
              Cancelar
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Borrar
            </Button>
          </React.Fragment>
        }
      >
        <p>Continuar con el borrado del post????</p>
      </Modal>
      <li className="user-item">
        <CardPost>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <AvatarPost
              image={`http://localhost:5000/${props.image}`}
              alt={props.title}
            />
          </div>
          <div>
            <h2>{props.title}</h2>
            <h3>{props.ciudad}</h3>
            <h3>{props.categoria}</h3>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              Mapa
            </Button>
            {auth.userId === props.creatorId && (
              <Button edit to={`/posts/${props.id}`}>
                Editar
              </Button>
            )}
            {auth.userId === props.creatorId && (
              <Button danger onClick={showDeleteWarningHandler}>
                Borrar
              </Button>
            )}
          </div>
        </CardPost>
      </li>
    </React.Fragment>
  );
};

export default PostItem;
