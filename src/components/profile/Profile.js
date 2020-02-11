import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { TaskContext } from '../tasks/TaskProvider';
import './Profile.css'


export default () => {
  const { tasks } = useContext(TaskContext)
  const activeUser = parseInt(localStorage.getItem("user"), 10)
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

  let completedTasksDatesArray = []
  let labelDataArray = []
  let dataCountArray = []

  //  completedUserTasks.forEach(task => {
  //      return completedTasksDatesArray.push(task.completionDate)
  //  })

  const dataBuilder = () => {
    let dateObject = {}
    completedUserTasks.forEach(task => {
      if (dateObject.hasOwnProperty(task.completionDate)) {
        dateObject[task.completionDate] = dateObject[task.completionDate] + 1
      } else {
        dateObject[task.completionDate] = 1
      }
      console.log(dateObject, "TACO")
      
    })
    for (const key in dateObject) {
      labelDataArray.push(key)
      dataCountArray.push(dateObject[key])
    }
  }
  dataBuilder()

  console.log("labels", labelDataArray)
  console.log("counts", dataCountArray)

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
  return(
    <>
      <h1>Profile Page</h1>
      <section className="profileContainer">
        <div className="graphContainer">
          <Bar data={data} />
        </div>
      </section>
    </>
  )
}