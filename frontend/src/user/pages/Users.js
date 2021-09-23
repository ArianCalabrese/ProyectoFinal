import React, { useEffect } from "react";

import UsersList from "../components/UsersList";

const Users = () => {
   useEffect(() => {
     const sendRequest = async () => {
      const response = await fetch('http://localhost:5000/api/users');

      const responseData= await response.json();
     };
     sendRequest();
   }, [])

  return <UsersList items={USERS} />;
};

export default Users;
