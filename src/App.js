/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./css/main.css";
import DisplayTodos from "./components/DisplayTodos";
import Todos from "./components/Todos";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


 import { motion } from "framer-motion";
function App({history}) {

  //handle todos
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/todo")
      .then((r) => r.json())
      .then((todo) => setTodo(todo));
  }, []);

  const fetchTodos = () => {
    fetch('/api/todo')
      .then((res) => res.json())
      .then((data) => setTodo(data))
  }

  const patchTodos = (todo) => {
    fetch(`/api/todo/${todo.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    })
  }

  const postTodos = (todo) => {
    fetch('/api/todo/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodo((prevTodo) => {
          return [...prevTodo, data]
        })
      })
  }








  return (
    <div className="App">
      <nav>
        <motion.h1
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
      >
        My.ToDo
      </motion.h1>
        <button onClick={() => history.push('/login')}> LogIn </button>
        </nav>

      <motion.div
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <Todos />
        <DisplayTodos />
      </motion.div>
    </div>
  );
}

export default App;
