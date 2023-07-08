import React, { useState, useContext } from "react";
import CustomModal from "../modal";
import { DeleteTaskById } from "../../services/task_service";
import { DataProvider } from "../../context/DataContext";

export const DeleteTask = ({ show, setShow, id }) => {
  const {
    userInfo: {
      user: { token },
    },
  } = useContext(DataProvider);

  function handleConfirm() {
    DeleteTaskById({ id, token })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      {" "}
      <CustomModal
        show={show}
        setShow={setShow}
        titulo={"Eliminar tarea"}
        handleSave={handleConfirm}
      >
        <div>
          <h3>¿Está seguro que desea eliminar la tarea?</h3>
        </div>
      </CustomModal>
    </div>
  );
};
