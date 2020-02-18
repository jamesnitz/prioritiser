import React, { useContext, useRef, useState, useEffect } from "react"
import { TaskContext } from "../tasks/TaskProvider"
import Archive from "./Archive"
import moment from "moment"
import "./ArchiveList.css"
import {Button} from "react-bootstrap"

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
      <h1 className="archiveListHeader">Archive Page</h1>
      <div className="searchContainer">
        <input className="archiveSearch" type="text" defaultValue={""} placeholder="search by keyword" ref={keywordRef} onKeyDown={(event) => {
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
        <input  className="archiveDate" ref={dateRef} type="date"></input>
        <button className="btn btn-secondary archiveButton" onClick={() => {
          setTaskContainer(
            <section>
              <button className="clearArchiveButton btn btn-secondary" onClick={() => {
                setTaskContainer("")
              }}>Clear Entries</button>
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