import React from "react"
import { Route } from "react-router-dom"
import { TaskProvider } from "./tasks/TaskProvider"
import TaskList from "./tasks/TaskList"
import ArchiveList from "./archive/ArchiveList"
import Profile from "./profile/Profile"
import { ListProvider } from "./list/ListProvider"

export default () => {
  return (
    <>
      <TaskProvider>
        <ListProvider>
              {/* <Route exact path="/" render={
        props => <TaskList />
      }/> */}
              <Route exact path="/tasks" render={
                props => <TaskList />
              } />
              <Route path="/archive" render={
                props => <ArchiveList />
              } />
              <Route path="/profile" render={
                props => <Profile />
              } />
        </ListProvider>
      </TaskProvider>
    </>
  )
}