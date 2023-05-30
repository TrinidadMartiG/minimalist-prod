import React from 'react'
import './styles/index.scss'
import TaskList from './component/TaskList'
import 'bootstrap/dist/css/bootstrap.min.css'
import Timer from './component/TimerComponent'
import Navbar  from './component/NavBar'

let App = () => {
  return (
    <div>
      <Navbar />
      <h1 className='main-title'>There's something you need to do?</h1>
      <div className="task-app">
        <div className="task-principal-list">
          <h1 className="con-title">My To Do's</h1>
          <TaskList />
        </div>
        <div className="timer-con">
          <h1 className="con-title">Set a timer</h1>
          <Timer />
        </div>
      </div>
    </div>
  )
}

export default App
