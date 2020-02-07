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
  const itemRef = useRef("")
  const gradeRef = useRef("")
  const detailRef = useRef("")

  

  return (
    <section> 
      <div className="taskContainer">
        <address className={task.isCompleted ? "completed taskItem" : "notcompleted taskItem"} onClick={handleShow}> {task.taskItem}</address>
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
                  ref = {itemRef}
                  placeholder="What needs doing"
                  defaultValue={task.taskItem}
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
                  ref = {gradeRef}
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
                  ref = {detailRef}
                  defaultValue={task.taskDetail}
                  className="form-control"
                />
              </div>
            </fieldset>
            <button className="btn btn-primary" onClick={() => {
              editTask({
                id: task.id,
                taskItem: itemRef.current.value,
                userId: parseInt(localStorage.getItem("user"), 10),
                grade: gradeRef.current.value,
                taskDetail: detailRef.current.value,
                completionDate: task.completionDate,
                isCompleted: task.isCompleted
              })
            }}
            >Save</button>
            <button
            onClick={() => {
              if (window.confirm("Delete this item?")) {
                deleteTask(task);
              }
            }}
            className="editTask btn-edit-delete btn btn-light">
            Delete Task
          </button>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
        <address className="checkboxContainer">
          <label htmlFor="complete"> complete</label>
          <input
            type="checkbox"
            id="complete"
            ref={isCompleted}
            autoFocus
            className="checkbox"
            defaultChecked={task.isCompleted}
            onClick={
              () => {
                if (isCompleted.current.checked) {
                  patchTask({
                    id: task.id,
                    isCompleted: isCompleted.current.checked,
                    completionDate: "Today"
                  })
                } else {
                  patchTask({
                    id: task.id,
                    isCompleted: false
                  })
                }
              }
            } />

        </address>
      </div>

    </section>
  )
}