import React, { useContext, useRef, useState } from 'react'
import { TaskContext } from './TaskProvider'
import Modal from 'react-bootstrap/Modal'
import "./Task.css"


export default ({ task }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)

  const { deleteTask, patchTask } = useContext(TaskContext)
  const isCompleted = useRef(Boolean)

  const date = new Date();
  const currentDate = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
    '-' + date.getDate().toString().padStart(2, 0);


  return (
    <section>
      <div className="taskContainer">
        <address className="taskGrade"> {task.grade} </address>
      <address className="taskItem" onClick={handleShow}> {task.taskItem} 
        <button
          onClick={() => {
            if (window.confirm("Delete this item?")) {
              deleteTask(task);
            }
          }}
          className="editTask btn-edit-delete btn btn-light">
          Delete Task
      </button>
        </address>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{task.taskItem}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
      <address className="checkbox">
        <label htmlFor="complete"> complete</label>
        <input
          type="checkbox"
          id="complete"
          ref={isCompleted}
          autoFocus
          className="form-control"
          defaultChecked={false}
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
          } />

      </address>
          </div>

    </section>
  )
}