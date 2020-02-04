import React from "react"
import { Route } from "react-router-dom"

export default () => {
  return (
    <>
      <Route exact path="/" render={
          // props => <TaskList />
        }/>
    </>
  )
}