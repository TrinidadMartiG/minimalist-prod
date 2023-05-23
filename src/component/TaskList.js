import React, { useState, useEffect, useCallback } from 'react'
import '../styles/TaskListStyles.css'
import Task from './TaskComponent'

let TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')

  const fetchTask = useCallback(() => {
    return fetch('http://localhost:5000/api/tasks')
      .then((data) => data.json())
      .then((response) => {
        setTasks(response)
      })
  }, [])

  const modifyTask = (id, newData) => {
    fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((resp) => {
      if (!resp.ok) {
        throw Error(resp.statusText);
      }
      return resp.json();
    })
    .then((updatedTask) => {
      const updatedTasks = tasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
      setTasks(updatedTasks)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
  }

  useEffect(() => {
    fetchTask().catch((error) => console.error(error))
  },[])

  const addTask = (taskFromDealSend) => {
    fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      body: JSON.stringify(taskFromDealSend),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          throw Error(resp.statusText);
        }
        return resp.json();
      })
      .then((newTask) => {
        const taskUpdated = [newTask, ...tasks]
        setTasks(taskUpdated)
      })
      .catch((error) => {
        console.error('Error:', error)
      });
  };

  const deleteTask = (id,label) => {
    fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE',
    })
      .then((resp) => {
        if (!resp.ok) {
          throw Error(resp.statusText);
        }
        // If delete was successful, update state
        const taskUpdated = tasks.filter((task) => task._id !== id)
        setTasks(taskUpdated)
        console.log('Task deleted:', label,'id:',id)
      })
      .catch((error) => {
        console.error('Error:', error)
      });
  };

  const dealChange = (e) => {
    /* extrae valor de campo de texto */
    e.preventDefault()
    setInput(e.target.value)
    console.log(e.target.value, 'dealChange e.target.value')
  }

  const completeTask = (id) => {
    const taskUpdated = tasks.map((task) => {
      if (task.id === id) {
        task.complete = !task.complete
      }
      return task
    })
    setTasks(taskUpdated)
  }

  const dealSend = (e) => {
    /* evita que se recarge app completa */
    e.preventDefault()

    const newTask = {
      label: input,
    }
    /*task.onSubmit(newTask);*/
    addTask(newTask)
    setInput('')
    console.log('new task added', newTask)
  }

  return (
    <>
      <form className="task-form">
        <input
          type="text"
          className="task-input"
          placeholder="Write it here..."
          name="label"
          value={input}
          onChange={dealChange}
        />
        <button className="task-button" onClick={dealSend}>
          Add Task
        </button>
      </form>

      <div className="task-list-container">
        {tasks.map((elm, indx) => (
          <Task
            key={indx}
            /* debe tener un key para que react mantenga el orden de la lista */
            id={elm._id}
            label={elm.label}
            complete={elm.complete}
            completeTask={completeTask}
            deleteTask={deleteTask}
            modifyTask={modifyTask}
          />
        ))}
      </div>
    </>
  )
}

export default TaskList
