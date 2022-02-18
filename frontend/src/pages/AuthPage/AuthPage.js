import React, { useContext } from "react";
import "./AuthPage.css";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import { UserContext } from "../../shared/context/UserContext";

const AuthContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function AuthPage() {
  const auth = useContext(UserContext);

  console.log("User en AuthPage: " + JSON.stringify(auth));
  return (
    <AuthContainer>
      <AccountBox />
    </AuthContainer>
  );
}

export default AuthPage;
