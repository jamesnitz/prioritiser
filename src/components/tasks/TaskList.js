import React, { useContext, useState, useRef } from "react"
import { TaskContext } from "./TaskProvider"
import Task from "./Task"
import { ListContext } from "../list/ListProvider"
import Modal from 'react-bootstrap/Modal'
import { SharedListContext } from "../sharedLists/SharedListProvider"
import { UserContext } from "../users/UserProvider"
import "./TaskList.css"
import {Button} from "react-bootstrap"

export default () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)
  const { tasks, addTask, getTasks } = useContext(TaskContext)
  const { lists, addList, patchList } = useContext(ListContext)
  const { addSharedList } = useContext(SharedListContext)
  const { users } = useContext(UserContext)
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
  const sharedEmailRef = useRef("")
  const sharedlListRef = useRef("")
  const handleControlledInputChange = (event) => {
    const newTask = Object.assign({}, singleTask)
    newTask[event.target.name] = event.target.value
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

  const activeLists = usersLists.filter(list => {
    if (list.archived === false) {
      return list
    }
  })

  const currentListTasks = tasks.filter(task => {
    if (task.listId === selectedList) {
      return task
    }
  })



  const foundTasks = currentListTasks.filter(task => {
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

  if (foundTasks.length < 1 && ViewListRef.current.value !== "0") {
    taskList = <section>
      <h3>No tasks added</h3>
    </section>
  }



  if (gradeATasks.find(task => !task.isCompleted)) {
    taskList = <>
      <section className="showAllListSection">
        <h4>A Priority</h4>
        {gradeATasks.map(task => {
          return <Task key={task.id}
            task={task} />
        })}
      </section>
    </>
  } else if (gradeATasks.every(task => task.isCompleted) && gradeBTasks.find(task => !task.isCompleted)) {
    taskList = <>
      <section className="showAllListSection">
        <h4>B Priority</h4>
        {gradeBTasks.map(task => {
          return <Task key={task.id}
            task={task} />
        })}
      </section>
    </>
  } else if (gradeATasks.every(task => task.isCompleted) && gradeBTasks.every(task => task.isCompleted) && gradeCTasks.find(task => !task.isCompleted)) {
    taskList = <>
      <section className="showAllListSection">
        <h4>C Priority</h4>
        {gradeCTasks.map(task => {
          return <Task key={task.id}
            task={task} />
        })}
      </section>
    </>
  } else if (gradeATasks.every(task => task.isCompleted) && gradeBTasks.every(task => task.isCompleted) && gradeCTasks.every(task => task.isCompleted) && gradeDTasks.find(task => !task.isCompleted)) {
    taskList = <>
      <section className="showAllListSection">
        <h4>D Priority</h4>
        {gradeDTasks.map(task => {
          return <Task key={task.id}
            task={task} />
        })}
      </section>
    </>
  }

  let taskArchiveButtonContainer = ""
  if (foundTasks.length >= 1 && gradeATasks.every(task => task.isCompleted) && gradeBTasks.every(task => task.isCompleted) && gradeCTasks.every(task => task.isCompleted) && gradeDTasks.every(task => task.isCompleted)) {
    taskArchiveButtonContainer =
      <button className="btn btn-primary" onClick={() => {
        const foundList = lists.find(list => list.id === parseInt(ViewListRef.current.value), 10)
        patchList({
          id: foundList.id,
          archived: true
        }).then(getTasks)
      }}>Archive List</button>
  }


  if (showAllButtonClicked) {

    
  }

  if (showAllButtonClicked) {
    taskList = <>
      <section className="showAllListSection">
        {foundTasks.length < 1 ? <div className="NothingFound">Please select a different list or add tasks</div> : <div></div>}
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
      userId: parseInt(localStorage.getItem("user"), 10),
      archived: false
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

  const constructNewsharedList = () => {
    const sharedEmailName = sharedEmailRef.current.value
    const foundUser = users.find(user => user.email === sharedEmailName)
    if (foundUser === undefined) {
      window.alert("No matching email found")
    } else {
      addSharedList({
        initiateUser: parseInt(localStorage.getItem("user"), 10),
        userId: foundUser.id,
        listId: parseInt(sharedlListRef.current.value, 10)
      })

    }

  }

  return (
    <main className="taskListContainer">
      <h1>My Lists</h1>
      <section className="listButtons">
        <button className="btn btn-secondary addList" onClick={() => {
          let trueVariable = true;
          let falseVariable = false;
          if (addListButtonClicked === false) {
            setAddListButtonClicked(trueVariable)
          } else {
            setAddListButtonClicked(falseVariable)
          }
        }
        }>{addListButtonClicked ? "Close" : "Add a List"}</button>
        <button className="btn btn-secondary addItem" onClick={() => {
          let trueVariable = true;
          let falseVariable = false;
          if (buttonClicked === false) {
            setButtonClicked(trueVariable)
          } else {
            setButtonClicked(falseVariable)
          }
        }}>{buttonClicked ? "Close" : "Add Items"}</button>
        <button className="btn btn-secondary showAll" onClick={() => {
          let showAllTrueVariable = true;
          let showAllFalseVariable = false;
          if (showAllButtonClicked === false) {
            setShowAllButtonClicked(showAllTrueVariable)
          } else {
            setShowAllButtonClicked(showAllFalseVariable)
          }
        }}>{showAllButtonClicked ? "Show current task" : "Show all"}</button>
        <button className="btn btn-secondary shareList" onClick={handleShow}>Share List</button>
        <Modal show={show} onHide={handleClose} className="shareModal">
          <Modal.Header closeButton>
            <Modal.Title>Share A List with Another User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label htmlFor="sharedList">Select your list</label>
            <select
              defaultValue="select"
              name="sharedList"
              ref={sharedlListRef}
              onChange={handleControlledInputChange}
              className="form-control">
              <option value="0">select</option>
              {activeLists.map(sharedList => (
                <option key={sharedList.id} value={sharedList.id}>
                  {sharedList.name}
                </option>))}
            </select>
            <label htmlFor="sharedUserEmail">Who would you like to share with?</label>
            <input
              className="form-control"
              ref={sharedEmailRef}
              name="sharedUserEmail"
              type="text"></input>
            <button className="btn btn-secondary modalShareList" onClick={(evt) => {
              if (sharedlListRef.current.value === "0") {
                evt.preventDefault()
                window.alert("Please choose a list")
              } else if (sharedEmailRef === "") {
                evt.preventDefault()
                window.alert("Please enter a user's email")
              } else {
                evt.preventDefault()
                constructNewsharedList()
                setShow(false)
              }
            }}>Share</button>
          </Modal.Body>
        </Modal>
      </section>
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
          <button type="submit" className="btn btn-primary" onClick={evt => {
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
                  {activeLists.map(list => (
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
            <button type="submit" className="btn btn-primary" onClick={evt => {
              if (taskRef.current.value === "") {
                window.alert("Please add a task")
                evt.preventDefault()
              } else if (gradeRef.current.value === "0") {
                window.alert("Please assign a grade")
                evt.preventDefault()
              } else if (listRef.current.value === "0") {
                evt.preventDefault()
                window.alert("Please select a list")
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
        <select className="currentViewSelect" ref={ViewListRef} onChange={handleControlledInputChange}>
          <option value="0">None</option>
          {activeLists.map(viewList => (
            <option key={viewList.id} value={viewList.id}>
              {viewList.name}
            </option>))}
        </select></h4>
      {taskList}
      {taskArchiveButtonContainer}
    </main>
  )
}