import React, { useContext, useState } from "react";
import CustomDropZone from "../dropzone";
import { DataProvider } from "../../context/DataContext";
import { UpdateUser } from "../../services/user_service";
import Loader from "../loader";
import { override } from "../../config/loader_constants";

import "./UserProfileComponent.css";

export const UserProfileComponent = () => {
  const {
    userInfo: { user },
  } = useContext(DataProvider);

  const { token, id, photoUrl, email, theme, created_at } = user;

  const [files, setFiles] = useState([]);
  const [picture, setPicture] = useState(photoUrl);
  const [loading, setLoading] = useState(false);

  function handleButtonClick() {
    setLoading(true);
    UpdateUser({ id, token, files })
      .then((res) => {
        setPicture(res.user.photoUrl);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  //siempre vamos a recibir un array con un sólo elemento
  const handleImagePreview = (files) => {
    setFiles(files);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPicture(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  return loading ? (
    <Loader loading={loading} override={override} color={"white"} />
  ) : (
    <div className="container-fluid drop">
      <h1>{email}</h1>
      <p>{theme}</p>
      <p>{created_at}</p>
      <CustomDropZone
        onAccept={(newFiles) => {
          handleImagePreview(newFiles);
        }}
        onReject={(reject) => console.log(reject)}
        siblings={
          <div className="drop">
            <img src={picture} />
            <p>Click para modificar</p>
          </div>
        }
      />
      <button className="btn btn-warning" onClick={handleButtonClick}>
        Guardar
      </button>
    </div>
  );
};
