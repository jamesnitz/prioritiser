import React, { useContext, useRef, useState } from 'react'
import { TaskContext } from './TaskProvider'
import Modal from 'react-bootstrap/Modal'
import "./Task.css"


export default ({ task }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)
  const { deleteTask, patchTask, editTask } = useContext(TaskContext)
  const isCompleted = useRef(Boolean)
  const [taskToEdit, setTask] = useState({})

  const handleControlledInputChange = (event) => {
    const singleTask = Object.assign({}, taskToEdit)
    singleTask[event.target.name] = event.target.value
    console.log(singleTask)
    setTask(singleTask)
  }


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
          <Modal.Body>
            <fieldset>
              <div className="form-group">
                <label htmlFor="taskItem">Task Info </label>
                <input type="text" name="taskItem" required autoFocus className="form-control"
                  proptype="varchar"
                  placeholder="What needs doing"
                  defaultValue={task.taskItem}
                  onChange={handleControlledInputChange}
                  className="form-control"
                />
              </div>
            </fieldset>
            <fieldset>
              <div className="form-group">
                <label htmlFor="grade">Grade this item</label>
                <select
                  defaultValue={task.grade}
                  name="grade"
                  id="grade"
                  required
                  onChange={handleControlledInputChange}
                  className="form-control">
                  <option value="0">select</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>
            </fieldset>
            <fieldset>
              <div className="form-group">
                <label htmlFor="detail">More Info </label>
                <textarea type="text" name="detail" required autoFocus className="form-control"
                  proptype="varchar"
                  placeholder="Provide details"
                  defaultValue={task.taskDetail}
                  onChange={handleControlledInputChange}
                  className="form-control"
                />
              </div>
            </fieldset>
            <button className="btn btn-primary" onClick={() => {
              console.log({
                id: task.id,
                taskItem: taskToEdit.taskItem,
                userId: parseInt(localStorage.getItem("user"), 10),
                grade: taskToEdit.grade,
                taskDetail: taskToEdit.detail,
                completionDate: taskToEdit.completionDate,
                isCompleted: taskToEdit.isCompleted
              })
              editTask({
                id: task.id,
                taskItem: task.taskItem,
                userId: parseInt(localStorage.getItem("user"), 10),
                grade: task.grade,
                taskDetail: task.taskDetail,
                completionDate: task.completionDate,
                isCompleted: task.isCompleted
              })
            }}
            >Save</button>
          </Modal.Body>
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
                    completionDate: "Today"
                  })
                }
              }
            } />

        </address>
      </div>

    </section>
  )
}