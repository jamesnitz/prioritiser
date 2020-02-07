import React, { useContext, useState, useRef } from "react"
import { TaskContext } from "./TaskProvider"
import Task from "./Task"

export default () => {
  const { tasks, addTask } = useContext(TaskContext)
  const activeUser = parseInt(localStorage.getItem("user"), 10)
  const [buttonClicked, setButtonClicked] = useState(false)
  const [showAllButtonClicked, setShowAllButtonClicked] = useState(false)
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

  const gradeATasks = foundTasks.filter(task => {
    if (task.grade === "A") {
      return task
    }
  })
  const gradeBTasks = foundTasks.filter(task => {
    if (task.grade === "B") {
      return task
    }
  })
  const gradeCTasks = foundTasks.filter(task => {
    if (task.grade === "C") {
      return task
    }
  })
  const gradeDTasks = foundTasks.filter(task => {
    if (task.grade === "D") {
      return task
    }
  })




  let taskList = ""
  if (foundTasks.length < 1) {
    taskList = <>
      <h1>Make a list, brah</h1>
    </>
  } else {
    taskList = <>
      <section>
        {gradeATasks.length >= 1 ?
          <div>
            <h4>A Priority</h4>
            {gradeATasks.map(task => {
              return <Task key={task.id}
                task={task} />
            })}
          </div>
          : <div></div>}

        {gradeBTasks.length >= 1 ?
          <div>
            <h4>B Priority</h4>
            {gradeBTasks.map(task => {
              return <Task key={task.id}
                task={task} />
            })}
          </div>
          : <div></div>}
        {gradeCTasks.length >= 1 ?
          <div>
            <h4>C Priority</h4>
            {gradeCTasks.map(task => {
              return <Task key={task.id}
                task={task} />
            })}
          </div>
          : <div></div>}
        {gradeDTasks.length >= 1 ?
          <div>
            <h4>D Priority</h4>
            {gradeDTasks.map(task => {
              return <Task key={task.id}
                task={task} />
            })}
          </div>
          : <div></div>}
      </section>
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
      <button onClick={() => {
        let showAllTrueVariable = true ;
        let showAllFalseVariable = false ;
        if (showAllButtonClicked === false) {
          setShowAllButtonClicked(showAllTrueVariable)
        } else {
          setShowAllButtonClicked(showAllFalseVariable)
        }
      }}>{showAllButtonClicked ? "Show current priority" : "Show all tasks"}</button>
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
              } else if (gradeRef.current.value === "0") {
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
          <></>
        )}
      {taskList}
    </section>
  )
}