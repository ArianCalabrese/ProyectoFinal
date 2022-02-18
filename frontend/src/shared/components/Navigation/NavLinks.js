import React, { useContext } from "react";

import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(UserContext);
  
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/usuarios" exact>
          Usuarios
        </NavLink>
      </li>
      <li>
        <NavLink to="/posts">Ver Posts</NavLink>
      </li>
      {!auth.isLoggedIn && <li>
        <NavLink to="/login">Login</NavLink>
      </li>}
      {auth.isLoggedIn && <li>
        <NavLink to={`/${auth.userId}/posts`}>Mis Posts</NavLink>
      </li>}
      {auth.isLoggedIn && <li>
        <NavLink to="/agregarpost">Agregar Post</NavLink>
      </li>}
      {auth.isLoggedIn && <li>
        <NavLink to="buscarpost">Buscar Post</NavLink>
      </li>}
      {auth.isLoggedIn && <li>
        <button onClick={auth.logout}>Logout</button>
        </li>}
    </ul>
  );
};

export default NavLinks;
