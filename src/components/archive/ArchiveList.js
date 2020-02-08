import React, { useContext, useRef } from "react"
import { TaskContext } from "../tasks/TaskProvider"
import Task from "../tasks/Task"



export default () => {
  
  const {tasks} = useContext(TaskContext)
  const activeUser = parseInt(localStorage.getItem("user"), 10)
  const keywordRef = useRef("")
  const foundTasks = tasks.filter(task => {
    if (task.userId === activeUser) {
      return task
    } 
  })

  const completedTasks = foundTasks.filter(task => {
    if (task.isCompleted === true) {
      return task
    }
  })

  return (
    <section>
      <h1>Archive Page</h1>
      <div className="searchContainer">
      <input type="text" placeholder="search by keyword" ref={keywordRef} onKeyPress={(event) => {
        if (event.charCode === 13) {
          console.log("i'm doing it")
          //MAKE ARCHIVE FUNCTION HERE
          completedTasks.map(task => {
            if (task.taskItem.includes(keywordRef.current.value.toUpperCase()) || task.taskDetail.includes(keywordRef.current.value.toUpperCase())) {
              return <Task key={task.id}
              task={task} />
            } 
          })
        }
      }}></input>
      <input type="date"></input>
      <button>Search Entry</button>
      </div>
      <div className="taskContainer"></div>
    </section>
  )
}