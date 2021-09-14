import React from "react";
import "./AuthPage.css";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";

const AuthContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function AuthPage() {
  return (
    <AuthContainer>
      <AccountBox />
    </AuthContainer>
  );
}

export default AuthPage;
