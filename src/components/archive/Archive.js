import React from "react"
import "./Archive.css"

export default ({task}) => {
  return (
    <section className="archiveTask">
    <div className="archiveHeader">
    <h3 className="archiveListName">{task.list.name}</h3>
    <h6 className="archiveCompletion">{task.completionDate}</h6>
    </div>
    <div className="archiveBody">
    <address className="archiveTaskItem">{task.taskItem}</address>
    <address className="archiveDetail">{task.taskDetail}</address>
    </div>
    </section>
  )
}