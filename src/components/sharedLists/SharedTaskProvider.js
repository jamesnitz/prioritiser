import React, { useState, useEffect } from "react"

export const SharedSharedTaskContext = React.createContext()

export const SharedTaskProvider = (props) => {
    const [sharedTasks, setSharedTasks] = useState([])

    const getSharedTasks = () => {
        return fetch("http://localhost:8088/sharedTasks")
            .then(res => res.json())
            .then(setSharedTasks)
    }

    const addSharedTask = sharedTask => {
        return fetch("http://localhost:8088/sharedTasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sharedTask)
        })
            .then(getSharedTasks)
    }

    const deleteSharedTask = sharedTask => {
      return fetch(`http://localhost:8088/sharedTasks/${sharedTask.id}`, {
        method: "DELETE",
      })
        .then(getSharedTasks)
    }

    const editSharedTask = sharedTask => {
      return fetch(`http://localhost:8088/sharedTasks/${sharedTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sharedTask)
      })
        .then(getSharedTasks)
    }

   
    useEffect(() => {
        getSharedTasks()
    }, [])

    useEffect(() => {
        console.log("SharedTask app state change")
    }, [sharedTasks])

    return (
      <SharedTaskContext.Provider value = {{
        sharedTasks, addSharedTask, deleteSharedTask, editSharedTask
      }}>
          {props.children}
      </SharedTaskContext.Provider>
    )
  
}