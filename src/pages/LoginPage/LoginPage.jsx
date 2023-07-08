import React, { useState, useContext, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Loader from "../../components/loader";
import { Login } from "../../services/user_service";
import { DataProvider } from "../../context/DataContext";

import "./LoginPage.css";
import { override } from "../../config/loader_constants";
import { Get, Set } from "../../services/local_storage_service";
import { KEYS } from "../../config/local_storage_constants";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";

const LoginForm = ({ handleFormInputs, setUser, handleButtonClick, user }) => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email </Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          onChange={handleFormInputs}
        />
        <Form.Text className="text-muted">
          Nunca compartiremos tu contraseña.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleFormInputs}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="Mantenerme Conectado"
          onClick={(e) =>
            setUser({
              ...user,
              permiteLocalStorage: e.target.checked,
            })
          }
        />
      </Form.Group>
      <NavLink className="linkto" to="/register">
        No tienes cuenta? Registrate acá
      </NavLink>
      <hr />
      <Button variant="warning" type="submit" onClick={handleButtonClick}>
        Iniciar Sesión
      </Button>
    </Form>
  );
};

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { setUserInfo, userInfo } = useContext(DataProvider);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    permiteLocalStorage: false,
  });

  useEffect(() => {
    const response = Get(KEYS.USER);

    if (response) {
      setUserInfo({
        isLogged: true,
        user: response,
      });
      setUser({
        isLogged: true,
        user: response,
      });
      navigate("/");
    }
  }, []);

  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    Login({
      email: user.email,
      password: user.password,
    })
      .then(({ user, token }) => {
        setUserInfo({
          isLogged: true,
          user: {
            token,
            id: user.id,
            photoUrl: user.photoUrl,
            email: user.email,
            theme: user.theme_type,
            registered_at: user.fecha_creacion,
          },
        });
        Set(KEYS.USER, {
          token,
          id: user.id,
          photoUrl: user.photoUrl,
          email: user.email,
          theme: user.theme_type,
          registered_at: user.fecha_creacion,
        });

        navigate("/");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      }); //para limpiar recursos
  };

  const handleFormInputs = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.div
      className="form-container"
      initial={{ y: -600 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", delay: 0.1 }}
    >
      {loading ? (
        <Loader color={"white"} loading={loading} override={override} />
      ) : (
        <LoginForm
          handleButtonClick={handleButtonClick}
          setUser={setUser}
          user={user}
          handleFormInputs={handleFormInputs}
        />
      )}
    </motion.div>
  );
}
