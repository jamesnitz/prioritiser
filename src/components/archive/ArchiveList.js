import React, { useContext, useRef, useState } from "react"
import { TaskContext } from "../tasks/TaskProvider"
import Archive from "./Archive"

export default () => {
  const { tasks } = useContext(TaskContext)
  const activeUser = parseInt(localStorage.getItem("user"), 10)
  const keywordRef = useRef("")
  const [ taskContainer, setTaskContainer ] = useState("")

  const completedTasks = tasks.filter(task => {
    if (task.list.archived === true) {
      return task
    }
  })

  const CompletedUserTasks = completedTasks.filter(task => {
    if (task.userId === activeUser) {
      return task
    }
  })
  
  return (
    <section>
      <h1>Archive Page</h1>
      <div className="searchContainer">
        <input type="text" placeholder="search by keyword" ref={keywordRef} onKeyPress={(event) => {
          if (event.charCode === 13 && keywordRef.current.value !== "") {
            setTaskContainer(
              <section>
                {
                  CompletedUserTasks.map(task => {
                    console.log(keywordRef.current.value)
                    if (task.taskItem.includes(keywordRef.current.value) || task.taskDetail.includes(keywordRef.current.value)) {
                      console.log(task)
                      return <Archive key={task.id}
                        task={task} />
                    }
                  })}
              </section>
            )
          } else {
            setTaskContainer("")
          }
        }}></input>
        <input type="date"></input>
        <button>Search Entry</button>
      </div>
      {console.log(taskContainer)}
      <div className="taskContainer">{taskContainer}</div>
    </section>
  )
}