import { SERVER_CONSTANTS } from "../config/server_constants";

async function CreateTask({
  titulo,
  descripcion,
  fecha,
  urgente,
  user_id,
  token,
}) {
  const body = {
    titulo,
    descripcion,
    fecha,
    urgente,
    user_id,
  };

  const response = await fetch(`${SERVER_CONSTANTS.URL_LOCAL}/tasks/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return await response.json();
}

async function UpdateTask({
  titulo,
  descripcion,
  fecha,
  estado,
  urgente,
  id,
  token,
}) {
  const body = {
    titulo,
    descripcion,
    fecha,
    urgente,
    estado,
  };

  const response = await fetch(`${SERVER_CONSTANTS.URL_LOCAL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return await response.json();
}

async function DeleteTaskById({ id, token }) {
  const response = await fetch(`${SERVER_CONSTANTS.URL_LOCAL}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}

async function GetTasks({ page, token }) {
  const response = await fetch(
    `${SERVER_CONSTANTS.URL_LOCAL}/tasks?page=${page}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  const results = await response.json();
  return results;
}

async function GetTaskById({ id, token }) {
  const response = await fetch(`${SERVER_CONSTANTS.URL_LOCAL}/tasks/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const results = await response.json();
  return results;
}

export { CreateTask, UpdateTask, DeleteTaskById, GetTasks, GetTaskById };
