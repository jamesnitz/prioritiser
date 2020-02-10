import React, { useContext, useState, useRef } from "react"
import { TaskContext } from "./TaskProvider"
import Task from "./Task"
import { ListProvider, ListContext } from "../list/ListProvider"

export default (props) => {

  const { tasks, addTask, patchTask } = useContext(TaskContext)
  const { lists, addList } = useContext(ListContext)

  const activeUser = parseInt(localStorage.getItem("user"), 10)
  const [buttonClicked, setButtonClicked] = useState(false)
  const [addListButtonClicked, setAddListButtonClicked] = useState(false)
  const [showAllButtonClicked, setShowAllButtonClicked] = useState(false)
  const [singleTask, setTask] = useState({})
  const taskRef = useRef("")
  const listNameRef = useRef("")
  const ViewListRef = useRef(0)
  const listRef = useRef(0)
  const gradeRef = useRef(0)

  const handleControlledInputChange = (event) => {
    const newTask = Object.assign({}, singleTask)
    newTask[event.target.name] = event.target.value
    console.log(newTask)
    setTask(newTask)
  }


  if (tasks.isCompleted === true) {
    taskRef.classList.add("completed")
  }

  let selectedList = parseInt(ViewListRef.current.value, 10)

  const usersLists = lists.filter(list => {
    if (list.userId === parseInt(localStorage.getItem("user"), 10)) {
      return list
    }
  })
  
  const currentList = tasks.filter(task => {
    if (task.listId === selectedList) {
      return task
    }
  })
  
  console.log(currentList)
  
  const foundTasks = currentList.filter(task => {
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
  }





  if (gradeATasks.find(task => !task.isCompleted)) {
    taskList = <>
      <section>
        <h4>A Priority</h4>
        {gradeATasks.map(task => {
          return <Task key={task.id}
            task={task} />
        })}
      </section>
    </>
  } else if (gradeATasks.every(task => task.isCompleted) && gradeBTasks.find(task => !task.isCompleted)) {
    taskList = <>
      <section>
        <h4>B Priority</h4>
        {gradeBTasks.map(task => {
          return <Task key={task.id}
            task={task} />
        })}
      </section>
    </>
  } else if (gradeATasks.every(task => task.isCompleted) && gradeBTasks.every(task => task.isCompleted) && gradeCTasks.find(task => !task.isCompleted)) {
    taskList = <>
      <section>
        <h4>C Priority</h4>
        {gradeCTasks.map(task => {
          return <Task key={task.id}
            task={task} />
        })}
      </section>
    </>
  } else if (gradeATasks.every(task => task.isCompleted) && gradeBTasks.every(task => task.isCompleted) && gradeCTasks.every(task => task.isCompleted) && gradeDTasks.find(task => !task.isCompleted)) {
    taskList = <>
      <section>
        <h4>D Priority</h4>
        {gradeDTasks.map(task => {
          return <Task key={task.id}
            task={task} />
        })}
      </section>
    </>
  }

  if (gradeATasks.every(task => task.isCompleted) && gradeBTasks.every(task => task.isCompleted) && gradeCTasks.every(task => task.isCompleted) && gradeDTasks.every(task => task.isCompleted)) {
    //This is where tasks need to then be sent to the archive! Do this later
    console.log("finished")
  }




  if (showAllButtonClicked) {
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

  const constructNewList = () => {
    addList({
      name: listNameRef.current.value,
      userId: parseInt(localStorage.getItem("user"), 10)
    })
  }



  const constructNewTask = () => {
    addTask({
      taskItem: singleTask.taskItem,
      userId: parseInt(localStorage.getItem("user"), 10),
      grade: singleTask.grade,
      taskDetail: "",
      completionDate: "",
      isCompleted: false,
      listId: parseInt(singleTask.list, 10)
    })
  }


  // const markAllCompleted = () => {
  //   foundTasks.map(task => {
  //     if (task.isCompleted === false) {
  //       debugger
  //       return patchTask({
  //         id: task.id,
  //         isCompleted: true
  //       })
  //     }
  //   })
  // }

  return (
    <section>
      <h1>My Lists</h1>
      <button onClick={() => {
        let trueVariable = true;
        let falseVariable = false;
        if (addListButtonClicked === false) {
          setAddListButtonClicked(trueVariable)
        } else {
          setAddListButtonClicked(falseVariable)
        }
      }
      }>{addListButtonClicked ? "Close" : "Add a List"}</button>
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
        let showAllTrueVariable = true;
        let showAllFalseVariable = false;
        if (showAllButtonClicked === false) {
          setShowAllButtonClicked(showAllTrueVariable)
        } else {
          setShowAllButtonClicked(showAllFalseVariable)
        }
      }}>{showAllButtonClicked ? "Show current priority" : "Show all tasks"}</button>
      {/* <button onClick={() => markAllCompleted()}>Mark all as Complete</button> */}
      {addListButtonClicked ? (
        <form>
          <fieldset>
            <div className="form-group">
              <label htmlFor="listAdd">Add a new List </label>
              <input type="text" name="listAdd" required autoFocus className="form-control"
                proptype="varchar"
                ref={listNameRef}
                placeholder="Name your List"
                onChange={handleControlledInputChange}
                className="form-control"
              />
            </div>
          </fieldset>
          <button type="submit" onClick={evt => {
            if (listNameRef.current.value === "") {
              evt.preventDefault()
              window.alert("Please name your list")
            } else {
              evt.preventDefault()
              constructNewList()
              listNameRef.current.value = ""
              let falseVariable = false
              setAddListButtonClicked(falseVariable)
            }
          }
          }>Save New List</button>
        </form>
      ) : ("")}
      {buttonClicked ? (
        <>
          <form>
            <fieldset>
              <div className="form-group">
                <label htmlFor="list">Add to a list</label>
                <select
                  defaultValue="select"
                  name="list"
                  id="list"
                  required
                  ref={listRef}
                  onChange={handleControlledInputChange}
                  className="form-control">
                  <option value="0">select</option>
                  {usersLists.map(list => (
                    <option key={list.id} value={list.id}>
                      {list.name}
                    </option>))}
                </select>
              </div>
            </fieldset>
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
      <h4>Currently Viewing 
        <select ref={ViewListRef} onChange={handleControlledInputChange}>
        <option value="0">select</option>
        {usersLists.map(viewList => (
          <option key={viewList.id} value={viewList.id}>
            {viewList.name} 
          </option>))}
      </select> List</h4>
      {taskList}
    </section>
  )
}