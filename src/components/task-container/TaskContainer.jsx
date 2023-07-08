import React, { useState, useEffect, useContext } from "react";
import { GetTasks } from "../../services/task_service";
import { DataProvider } from "../../context/DataContext";
import { Task } from "../task/Task";
import Loader from "../loader";
import { override } from "../../config/loader_constants";
import { motion } from "framer-motion";

import "./TaskContainer.css";

export const TaskContainer = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const {
    userInfo: { user },
  } = useContext(DataProvider);

  const { token } = user;

  useEffect(() => {
    setLoading(true);
    GetTasks({ page, token })
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  return (
    <div className="task-container">
      {loading ? (
        <Loader color={"white"} override={override} loading={loading} />
      ) : tasks.length === 0 ? (
        <div>No hay Tareas</div>
      ) : (
        <motion.div
          initial={{ x: 600 }}
          animate={{ x: 0 }}
          transition={{ type: "spring" }}
          className="overflow"
        >
          {tasks?.map((element, index) => {
            return <Task key={index} task={element} />;
          })}
        </motion.div>
      )}
    </div>
  );
};
