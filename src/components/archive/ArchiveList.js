import React, { useContext, useRef, useState } from "react"
import { TaskContext } from "../tasks/TaskProvider"
import Archive from "./Archive"
import moment from "moment"

export default () => {
  const { tasks } = useContext(TaskContext)
  const activeUser = parseInt(localStorage.getItem("user"), 10)
  const keywordRef = useRef("")
  const dateRef = useRef("")
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
        <input type="text" defaultValue={""} placeholder="search by keyword" ref={keywordRef} onKeyDown={(event) => {
          if (event.keyCode === 13 && keywordRef.current.value !== "") {
            setTaskContainer(
              <section>
                {
                  CompletedUserTasks.map(task => {
                    if (task.taskItem.includes(keywordRef.current.value) || task.taskDetail.includes(keywordRef.current.value)) {
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
        <input ref={dateRef} type="date"></input>
        <button onClick={() => {
          console.log(dateRef.current.value)
          setTaskContainer(
            <section>
              <button onClick={() => {
                setTaskContainer("")
              }}>Clear</button>
                {
                  CompletedUserTasks.map(task => {
                    if (task.completionDate === moment(dateRef.current.value).format("MM/DD/YYYY") ) {
                      return <Archive key={task.id}
                        task={task} />
                    }
                  })}
              </section>
          )
        }}>Search Entry</button>
      </div>
      <div className="taskContainer">{taskContainer}</div>
    </section>
  )
}