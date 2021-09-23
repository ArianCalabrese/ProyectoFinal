import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import CardPost from "../../shared/components/UiElements/CardPost";
import AvatarPost from "../../shared/components/UiElements/AvatarPost";
import PostList from "../components/PostList";

const POST =[
    {
        id: 'p1',
        Image: "https://elgourmet.s3.amazonaws.com/recetas/share/88fa3ca583e136398d5f84e8c4cf9e37_3_3_photo.png",
        name: 'cama',
        ciudad: 'La Plata',
        categoria: 'Muebles'
    }
]

const Post = (props) => {
    const postid = useParams().postid;
    
    return <PostList items={props} />;
};

export default Post;