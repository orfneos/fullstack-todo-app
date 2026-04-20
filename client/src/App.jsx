import { useState, useEffect } from "react";
import TaskItem from "./components/TaskItem";
import AddTaskForm from "./components/AddTaskForm";



function App() {
  const [task, setTask] = useState([])


useEffect(() => {
  fetch('http://localhost:3000/api/tasks')
    .then(res => res.json())
    .then(data => setTask(data))
}, [])
  

async function addTask(text) {
  if(text.trim() === ('')) {
    return
  }
  try{
  const res = await fetch('http://localhost:3000/api/tasks', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ id: Date.now(), text: text, completed: false})
  })
  const data = await res.json()
  console.log(data)
  setTask([...task, data])
  } catch(error) {
    console.log('Error:', error)
  }
}

async function toggleTask(id) {
  try{
    await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: 'PUT'
    })
    setTask(task.map((t) => {
      if(t.id === id) {
        return {...t, completed: !t.completed}
      }
      return t
    }))
  } catch(error) {
    console.log('Error:', error)
  }
}

async function deleteTask(id) {
  try{
    await fetch(`http://localhost:3000/api/tasks/${id}`, {
    method: 'DELETE',
  })
    setTask(task.filter((t) => t.id !== id))
  } catch(error) {
    console.log('Error:', error)
  }
} 

  return(
    <>
    <AddTaskForm
      addTask={addTask}/>
    <ul>
      {task.map((t) => (
      <TaskItem
        key={t.id}
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