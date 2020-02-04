import React, { useState, useEffect } from "react"

export const TaskContext = React.createContext()

export const TaskProvider = (props) => {
    const [tasks, setTasks] = useState([])

    const getTasks = () => {
        return fetch("http://localhost:8088/tasks")
            .then(res => res.json())
            .then(setTasks)
    }

    const addTask = task => {
        return fetch("http://localhost:8088/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })
            .then(getTasks)
    }

    const deleteTask = task => {
      return fetch(`http://localhost:8088/tasks/${task.id}`, {
        method: "DELETE",
      })
        .then(getTasks)
    }

    const editTask = task => {
      return fetch(`http://localhost:8088/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
      })
        .then(getTasks)
    }

   
    useEffect(() => {
        getTasks()
    }, [])

    useEffect(() => {
        console.log("Task app state change")
    }, [tasks])

    return (
      <TaskContext.Provider value = {{
        tasks, addTask, deleteTask, editTask
      }}>
          {props.children}
      </TaskContext.Provider>
    )
  
}