import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import DateTimePicker from "react-datetime-picker";
import CustomModal from "../modal";
import { UpdateTask } from "../../services/task_service";
import { DataProvider } from "../../context/DataContext";

export const ModifyTask = ({ show, setShow, task }) => {
  const [date, setDate] = useState(task?.fecha);
  const [modifiedTask, setModifiedTask] = useState(task);

  const {
    userInfo: {
      user: { token },
    },
  } = useContext(DataProvider);

  function handleSave() {
    UpdateTask({
      titulo: modifiedTask.titulo,
      descripcion: modifiedTask.descripcion,
      fecha: date,
      urgente: modifiedTask.urgente,
      id: task._id,
      token: token,
      estado: modifiedTask.estado,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
  const handleCheck = (e) => {
    setModifiedTask({
      ...task,
      urgente: e.target.checked,
    });
  };

  return (
    <div>
      {" "}
      <CustomModal
        show={show}
        setShow={setShow}
        titulo={"Modificar tarea"}
        handleSave={handleSave}
      >
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) =>
                setModifiedTask({ ...modifiedTask, estado: e.target.value })
              }
            >
              <option>Seleccionar</option>
              <option value="REALIZANDO">REALIZANDO</option>
              <option value="REALIZADA">REALIZADA</option>
            </Form.Select>
          </Form.Group>
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
        </Form>
      </CustomModal>
    </div>
  );
};
