import React, { useContext, useRef } from 'react'
import { TaskContext } from './TaskProvider'

export default ({task}) => {
  const { deleteTask, patchTask } = useContext(TaskContext)
  const isCompleted = useRef(Boolean)

  const date = new Date();
  const currentDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
    '-' + date.getDate().toString().padStart(2, 0);


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
        <label htmlFor="complete"> complete</label>
        <input
          type="checkbox"
          id="complete"
          ref={isCompleted}
          autoFocus
          className="form-control"
          defaultChecked = {false}
          onClick={
            () => {  
              if (isCompleted.current.checked) {
                patchTask({
                  id: task.id,
                  isCompleted: isCompleted.current.checked,
                  completionDate: new Date(currentDate).toLocaleDateString('en-US')
                })
              }
            }
          }/>
      </address>
    
    </section>
  )
}