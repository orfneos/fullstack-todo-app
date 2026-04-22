import { useState, useEffect } from "react";
import TaskItem from "./components/TaskItem";
import AddTaskForm from "./components/AddTaskForm";



function App() {
  const [tasks, setTasks] = useState([])


useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/api/tasks`)
    .then(res => res.json())
    .then(data => setTasks(data))
}, [])
  

async function addTask(text) {
  if(text.trim() === ('')) {
    return
  }
  try{
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ text: text})
  })
  if(res.ok) {
    const data = await res.json()
    setTasks(prev => [...prev, data])
  } else {
    console.error('Server error during add')
    }
  } catch(error) {
    console.log('Network Error:', error)
  }
}

async function toggleTask(id) {
  try{
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
      method: 'PUT'
    })
    if(res.ok) {
      const updated = await res.json()
      setTasks(prev => prev.map(t => t._id === id ? updated : t)) 
    } else {
      console.error('Server error during toggle')
    }
  } catch(error) {
    console.log('Error:', error)
  }
}

async function deleteTask(id) {
  try{
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
    method: 'DELETE',
  })
  if(res.ok) {
    setTasks(prev => prev.filter((t) => t._id !== id))
  } else {
    console.error('Server error during delete')
    }
  } catch(error) {
    console.log('Error:', error)
  }
} 

  return(
    <>
    <AddTaskForm
      addTask={addTask}/>
    <ul>
      {tasks.map((t) => (
      <TaskItem
        key={t._id}
        task={t}
        toggleTask={toggleTask}
        deleteTask={deleteTask}/>
      ))
    }
    </ul>
    </>
  )
}

export default App