//Argumentos Con nombre - named arguments
async function CreateUser({ email, password, urlFoto }) {
  const body = {
    email,
    password,
    photoUrl: urlFoto,
  };

  const response = await fetch("http://localhost:5000/api/users/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return await response.json();
}

async function Login({ email, password }) {
  const body = {
    email,
    password,
  };

  const response = await fetch("http://localhost:5000/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const result = await response.json();

  return result;
}

async function UpdateUser({ id, token, files, theme }) {
  const formData = new FormData();
  formData.append("file", files[0]);
  formData.append(
    "data",
    JSON.stringify({
      theme,
    })
  );

  const response = await fetch(`http://localhost:5000/api/users/${id}`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return await response.json();
}

export { CreateUser, Login, UpdateUser };
