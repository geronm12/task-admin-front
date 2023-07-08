import React, { useState } from "react";

import "./Task.css";
import ModifyTask from "../modify-task";
import DeleteTask from "../delete-task";

export const Task = ({ task }) => {
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  return (
    <div className="task">
      {task.titulo}
      <button className="btn btn-warning" onClick={() => setShow(true)}>
        Modificar Tarea
      </button>
      <button className="btn btn-danger" onClick={() => setShowDelete(true)}>
        Eliminar Tarea
      </button>
      <ModifyTask show={show} setShow={setShow} task={task} />
      <DeleteTask id={task._id} setShow={setShowDelete} show={showDelete} />
    </div>
  );
};
