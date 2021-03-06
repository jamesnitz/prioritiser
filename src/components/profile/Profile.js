import React, { useContext, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { TaskContext } from '../tasks/TaskProvider';
import './Profile.css'
import { UserContext } from '../users/UserProvider';
import { SharedListContext } from '../sharedLists/SharedListProvider';
import {button} from "react-bootstrap"
 
export default () => {
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true)
  const { tasks } = useContext(TaskContext)
  const { users } = useContext(UserContext)
  const { sharedLists, deleteSharedList } = useContext(SharedListContext)
  const activeUser = parseInt(localStorage.getItem("user"), 10)
  const CurrentUserObject = users.find(user => user.id === activeUser) || {}

  const foundLists = sharedLists.filter(list => {
    if (list.userId === parseInt(localStorage.getItem("user"), 10)) {
      return list
    }
  }) || []
  console.log(foundLists)
  const initiateUserObjectArray = foundLists.filter(list => {
    const foundInitiateUser = users.find(user => user.id === list.initiateUser)
    list.userObject = foundInitiateUser
    return list
  }
  ) || []

  console.log(initiateUserObjectArray)
  const foundInitiateUserObject = initiateUserObjectArray.find(object => object.userObject.id === object.initiateUser) || {}
  console.log(foundInitiateUserObject)


  const nameBuilder = (userId) => {
    console.log(userId)
    const foundInitiateUserObject = initiateUserObjectArray.find(object => object.userObject.id === userId)
    return foundInitiateUserObject.userObject.name
  }
 
  const taskBuilder = (listId) => {
   return tasks.filter(task => task.listId === listId).map(task => <div className={task.isCompleted ? "sharedIndividualTask completedSharedItem" : "sharedIndividualTask"} key={task.id}> {task.grade} : {task.taskItem} </div>)
  }



  const userTasks = tasks.filter(task => {
    if (task.userId === activeUser) {
      return task
    }
  })

  const completedUserTasks = userTasks.filter(task => {
    if (task.isCompleted === true) {
      return task
    }
  })

  let labelDataArray = []
  let dataCountArray = []

  const dataBuilder = () => {
    let dateObject = {}
    completedUserTasks.forEach(task => {
      if (dateObject.hasOwnProperty(task.completionDate)) {
        dateObject[task.completionDate] = dateObject[task.completionDate] + 1
      } else {
        dateObject[task.completionDate] = 1
      }
    })
    for (const key in dateObject) {
      labelDataArray.push(key)
      dataCountArray.push(dateObject[key])
    }
  }
  dataBuilder()

  const data = {
    labels: labelDataArray,
    datasets: [
      {
        label: 'Task completion by date',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dataCountArray
      }
    ]
  };
  return (
    <>
      <h1 className="pageHeader">Your Profile</h1>
      <div className="profilePictureContainer">
      <img className="profilePicture" src={CurrentUserObject.picture} />
      </div>
      <section className="profileContainer">
        <div className="graphContainer">
          <Bar data={data} />
        </div>
      </section>
  <h4 className="sharedListTitle">{foundLists.length >= 1 ? "Shared Lists" : "No lists have been shared" }</h4>
      <section className="sharedListContainer">
        {foundLists.map(list => {
          return <div className="sharedList" key={list.id}>
            <div className="sharedListHeader">
            <h4 className="sharedbyListName">{list.list.name} </h4> <h5 className="sharedByHeader"> shared by {nameBuilder(list.initiateUser)}</h5>
            </div>
            <div>{taskBuilder(list.listId)}
            </div>
            <button className="btn btn-secondary" onClick={() => {
              deleteSharedList(list)
            }}>Remove List</button>
          </div>
        })}
      </section>
    </>
  )
}
