import React, { useContext, useRef, useState, useEffect } from "react"
import { TaskContext } from "../tasks/TaskProvider"
import Archive from "./Archive"
import moment from "moment"

export default () => {

  const { tasks } = useContext(TaskContext);
  const activeUser = parseInt(localStorage.getItem("user"), 10);
  const keywordRef = useRef("");
  const dateRef = useRef("");
  const [taskContainer, setTaskContainer] = useState("");

  const completedTasks = tasks.filter(task => {
    if (task.list.archived === true) {
      return task
    }
  });

  const completedUserTasks = completedTasks.filter(task => {
    if (task.userId === activeUser) {
      return task
    }
  });

  return (
    <section>
      <h1>Archive Page</h1>
      <div className="searchContainer">
        <input type="text" defaultValue={""} placeholder="search by keyword" ref={keywordRef} onKeyDown={(event) => {
          if (event.keyCode === 13 && keywordRef.current.value !== "") {
            setTaskContainer(
              <section>
                {
                  completedUserTasks.map(task => {
                    if (task.taskItem.toUpperCase().includes(keywordRef.current.value.toUpperCase()) || task.taskDetail.toUpperCase().includes(keywordRef.current.value.toUpperCase())) {
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
          setTaskContainer(
            <section>
              <button onClick={() => {
                setTaskContainer("")
              }}>Clear</button>
              {
                completedUserTasks.map(task => {
                  if (task.completionDate === moment(dateRef.current.value).format("MM/DD/YYYY")) {
                    return <Archive key={task.id}
                      task={task} />
                  }
                })}
            </section>
          )
        }}>Search Entry</button>
      </div>
      <div className="ArchiveTaskContainer">{taskContainer}</div>
    </section>
  )
}