import React, { useContext } from 'react'
import { TaskContext } from './TaskProvider'

export default ({task}) => {
  const { deleteTask } = useContext(TaskContext)

  return (
    <section>
  
    <address>{task.grade} {task.taskItem} <button
        onClick={() => {
          if (window.confirm("Delete this item?")) {
            deleteTask(task);
          }
        }}
        className="editTask btn-edit-delete btn btn-light">
        Delete Task
      </button>
      <input type="checkbox"></input>
      </address>
    
    </section>
  )
}