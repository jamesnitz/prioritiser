import React, { useContext, useRef } from "react"
import { TaskContext } from "../tasks/TaskProvider"



export default () => {
  const {tasks} = useContext(TaskContext)
  const activeUser = parseInt(localStorage.getItem("user"), 10)
  const keywordRef = useRef("")
  const foundTasks = tasks.filter(task => {
    if (task.userId === activeUser) {
      return task
    }
  })


  return (
    <section>
      <h1>Archive Page</h1>
      <div className="searchContainer">
      <input type="text" placeholder="search by keyword" ref={keywordRef} onKeyPress={(event) => {
        if (event.charCode === 13) {
          
        }
      }}></input>
      <input type="date"></input>
      <button>Search Entry</button>
      </div>
      <div className=""></div>
    </section>
  )
}