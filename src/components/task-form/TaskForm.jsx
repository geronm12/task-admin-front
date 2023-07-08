import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import DateTimePicker from "react-datetime-picker";
import { ToastContainer, toast } from "react-toastify";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import "./TaskForm.css";
import { CreateTask } from "../../services/task_service";
import { DataProvider } from "../../context/DataContext";
import Loader from "../loader";
import { override } from "../../config/loader_constants";

export const TaskForm = () => {
  const [date, setDate] = useState(new Date());
  const [task, setTask] = useState({
    titulo: "",
    descripcion: "",
    urgente: false,
  });
  const [loading, setLoading] = useState(false);

  const {
    userInfo: {
      user: { token, id },
    },
  } = useContext(DataProvider);

  const handleFormInputs = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheck = (e) => {
    setTask({
      ...task,
      urgente: e.target.checked,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    CreateTask({
      titulo: task.titulo,
      descripcion: task.descripcion,
      fecha: date,
      urgente: task.urgente,
      token,
      user_id: id,
    })
      .then((res) => {
        setLoading(false);
        clear();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const clear = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    setTask({
      descripcion: "",
      titulo: "",
      urgente: false,
    });

    setDate(new Date());
  };

  return (
    <div className="left-form">
      <h2>Agregar Tarea</h2>
      <hr />
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Titulo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresar titulo"
            onChange={handleFormInputs}
            name="titulo"
            value={task.titulo}
          />
        </Form.Group>

        <FloatingLabel
          controlId="floatingTextarea"
          label="Descripción"
          className="mb-3"
        >
          <Form.Control
            as="textarea"
            placeholder="Ingresar Descripción"
            name="descripcion"
            onChange={handleFormInputs}
            value={task.descripcion}
          />
        </FloatingLabel>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Es urgente"
            onClick={handleCheck}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <DateTimePicker onChange={setDate} value={date} />
        </Form.Group>
        {loading ? (
          <Loader color={"white"} loading={loading} override={override} />
        ) : (
          <div className="button-control">
            <Button variant="warning" type="submit" onClick={handleClick}>
              Guardar
            </Button>
            <Button variant="danger" type="submit" onClick={clear}>
              Clear
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
};
