import React from "react";

import PostItem from "./PostItem";
import CardPost from "../../shared/components/UiElements/CardPost";
import Button from "../../shared/components/FormElements/Button";

const PostList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <CardPost>
          <h2>No se encontraron post</h2>
          <Button to="/agregarpost">Agregar</Button>
        </CardPost>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map((post) => (
        <PostItem
          key={post.id}
          id={post.id}
          image={post.image}
          title={post.title}
          ciudad={post.ciudad}
          categoria={post.categoria}
          
          onDelete={props.onDeletePost}
          creatorId={post.creator}
        />
      ))}
    </ul>
  );
};

export default PostList;
