import React, { useContext, useState, useRef } from "react"
import { TaskContext } from "./TaskProvider"
import Task from "./Task"


export default () => {
  const { tasks, addTask } = useContext(TaskContext)
  const activeUser = parseInt(localStorage.getItem("user"), 10)
  const [buttonClicked, setButtonClicked] = useState(false)
  const [singleTask, setTask] = useState({})
  const taskRef = useRef("")
  const gradeRef = useRef(0)

  const handleControlledInputChange = (event) => {
    const newTask = Object.assign({}, singleTask)
    newTask[event.target.name] = event.target.value
    setTask(newTask)
  }

  const foundTasks = tasks.filter(task => {
    if (task.userId === activeUser) {
      return task
    }
  })

  let taskList = ""
  if (foundTasks < 1) {
    taskList = <>
      <h1>Make a list, brah</h1>
    </>
  } else {
    taskList = <>
      {foundTasks.map(task => {
        return <Task key={task.id}
          task={task} />
      })}
    </>
  }


  const constructNewTask = () => {
    addTask({
      taskItem: singleTask.taskItem,
      userId: parseInt(localStorage.getItem("user"), 10),
      grade: singleTask.grade,
      taskDetail: "",
      completionDate: undefined,
      isCompleted: false
    })
  }
  return (
    <section>
      <h1>List</h1>
      <button onClick={() => {
        let trueVariable = true;
        let falseVariable = false;
        if (buttonClicked === false) {
          setButtonClicked(trueVariable)
        } else {
          setButtonClicked(falseVariable)
        }
      }}>{buttonClicked ? "Close" : "Add Items"}</button>
      {buttonClicked ? (
        <>
        <form> 
          <fieldset>
            <div className="form-group">
              <label htmlFor="taskItem">Task Info </label>
              <input type="text" name="taskItem" required autoFocus className="form-control"
                proptype="varchar"
                ref={taskRef}
                placeholder="What needs doing"
                defaultValue={singleTask.taskItem}
                onChange={handleControlledInputChange}
                className="form-control"
                />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <label htmlFor="grade">Grade this item</label>
              <select
                defaultValue="select"
                name="grade"
                id="grade"
                ref={gradeRef}
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
          <button type="submit" onClick={evt => {
              if (taskRef.current.value === "") {
                window.alert("Please add a task")
                evt.preventDefault()
              } else if ( gradeRef.current.value === "0") {
                window.alert("Please assign a grade")
                evt.preventDefault()
              } else {
                evt.preventDefault()
                constructNewTask()
                taskRef.current.value = ""
                gradeRef.current.value = "0"
              }
          }
        }>Log new Task</button>
        </form>
        </>

      ) : (
          <>
            <h1>Start Knocking off List Items</h1>

          </>
        )}
      {taskList}
    </section>
  )
}