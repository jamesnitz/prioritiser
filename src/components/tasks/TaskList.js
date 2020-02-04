import React, { useContext } from "react"
import { TaskContext } from "./TaskProvider"

export default () => {
  const {tasks} = useContext(TaskContext)
  const activeUser = parseInt(localStorage.getItem("user"), 10)
  const foundTasks = tasks.filter(task => {
    if (task.userId === activeUser) {
      return task
    }
  })
  let taskList = ""
  if (foundTasks < 1) {
    taskList = <>
    <button>Add List</button>
    </>
  } else {
    taskList = <>
 


    </>
  }
console.log(foundTasks) 
  return (
    <section>
      <h1>List</h1>
      {taskList}
    </section>
  )
}