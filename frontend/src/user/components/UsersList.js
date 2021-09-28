import React from "react";

import UserItem from "./UserItem";
import Card from "../../shared/components/UiElements/Card";
import "./UsersList.css";

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
        <h2>No se encontraron usuarios</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className='users-list'>
      {props.items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          postCount={user.posts.length}
        />
      ))}
    </ul>
  );
};

export default UsersList;
