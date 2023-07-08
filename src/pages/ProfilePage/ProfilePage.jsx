import React from "react";
import CustomDropZone from "../../components/dropzone";
import Container from "react-bootstrap/Container";

import "./ProfilePage.css";
import UserProfileComponent from "../../components/user-profile";

export const ProfilePage = () => {
  return (
    <Container className="contenedor" fluid>
      <UserProfileComponent />
    </Container>
  );
};
