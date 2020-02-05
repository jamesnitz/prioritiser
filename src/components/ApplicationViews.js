import React from "react"
import { Route } from "react-router-dom"
import { TaskProvider } from "./tasks/TaskProvider"
import TaskList from "./tasks/TaskList"

export default () => {
  return (
    <>
    <TaskProvider>
      <Route exact path="/tasks" render={
           props => <TaskList />
        }/>
    </TaskProvider>
    </>
  )
}