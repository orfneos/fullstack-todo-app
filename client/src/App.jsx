import { useState, useEffect } from "react";
import TaskItem from "./components/TaskItem";
import AddTaskForm from "./components/AddTaskForm";



function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')


useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/api/tasks`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to fetch tasks')
      }
      return res.json()
    })
    .then((data) => {
      setTasks(data)
      setLoading(false)
    })
    .catch(() => {
      setError('Could not load tasks.')
      setLoading(false)
    })
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
   <div className="min-h-screen bg-black flex justify-center p-8">
    <div className="w-full max-w-xl bg-orange-400 rounded-2xl shadow-xl p-8 space-y-6">
      <h1 className="text-3xl font-bold text-center text-black">
        Todo App
      </h1>

        {loading && (<p className="text-center text-blue-500 font-medium">Loading tasks...</p>)}
        {error && (<p className="text-center text-red-500 bg-red-100 p-2 rounded-md mb-4 border border-red-200">{error}</p>)}

        <div className="mb-6">
          <AddTaskForm addTask={addTask}/>
        </div>

        <ul className="space-y-3">
          {tasks.map((t) => (
          <TaskItem
            key={t._id}
            task={t}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            />
          ))}
        </ul>
    </div>
   </div>
  )
}

export default App