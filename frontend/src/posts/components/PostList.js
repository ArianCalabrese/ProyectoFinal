import React from "react";

import PostItem from "./PostItem";
import CardPost from "../../shared/components/UiElements/CardPost";
import Button from "../../shared/components/FormElements/Button";
import PostCard from "./PostCard";
import { Box } from "@mui/system";

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
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        "& > :not(style)": {
          m: 1,
        },
      }}
    >
      {props.items.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          image={post.image}
          title={post.title}
          ciudad={post.ciudad}
          categoria={post.categoria}
        />
        // <PostItem
        //   key={post.id}
        //   id={post.id}
        //   image={post.image}
        //   title={post.title}
        //   ciudad={post.ciudad}
        //   categoria={post.categoria}

        //   onDelete={props.onDeletePost}
        //   creatorId={post.creator}
        // />
      ))}
    </Box>
  );
};

export default PostList;
