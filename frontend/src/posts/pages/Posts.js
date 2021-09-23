import { PostAddSharp } from '@material-ui/icons';
import React from 'react';

import PostList from '../components/PostList';

const Posts = () => {
    const POST = [
        {
            id: 'p1',
            name: 'Cama',
            image:  "https://elgourmet.s3.amazonaws.com/recetas/share/88fa3ca583e136398d5f84e8c4cf9e37_3_3_photo.png",
            ciudad: 'La Plata',
            categoria: 'Muebles'
        },
        {
            id: 'p2',
            name: 'Cama2',
            image:  "https://elgourmet.s3.amazonaws.com/recetas/share/88fa3ca583e136398d5f84e8c4cf9e37_3_3_photo.png",
            ciudad: 'Quilmes',
            categoria: 'Muebles'
        },
        {
            id: 'p3',
            name: 'Cama3',
            image:  "https://elgourmet.s3.amazonaws.com/recetas/share/88fa3ca583e136398d5f84e8c4cf9e37_3_3_photo.png",
            ciudad: 'Ensenada',
            categoria: 'Muebles'
        },
        {
            id: 'p4',
            name: 'Cama4',
            image:  "https://elgourmet.s3.amazonaws.com/recetas/share/88fa3ca583e136398d5f84e8c4cf9e37_3_3_photo.png",
            ciudad: 'Berisso',
            categoria: 'Muebles'
        }
    ];
    return <PostList items={POST} />;
};

export default Posts;