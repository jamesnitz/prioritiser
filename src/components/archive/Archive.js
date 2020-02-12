import React from "react"


export default ({task}) => {
  return (
    <section>
    <h3>{task.list.name}</h3>
    <address>{task.taskItem}</address>
    <address>{task.taskDetail}</address>
    </section>
  )
}