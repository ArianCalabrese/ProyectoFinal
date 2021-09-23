import React from 'react';

import './CardPost.css';

const CardPost = props => {
  return (
    <div className={`card ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default CardPost;