import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import TaskContainer from "../../components/task-container";
import TaskForm from "../../components/task-form";

import "./ManagePage.css";

export const ManagePage = () => {
  return (
    <Container fluid>
      <Row>
        <Col lg={3} className="left">
          <TaskForm />
        </Col>
        <Col>
          <TaskContainer></TaskContainer>
        </Col>
      </Row>
    </Container>
  );
};
