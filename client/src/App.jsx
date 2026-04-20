import { useState, useEffect } from "react";
import TaskItem from "./components/TaskItem";
import AddTaskForm from "./components/AddTaskForm";

const initialTasks = [
  { id: 1, text: "Gym", completed: false },
  { id: 2, text: "Read", completed: true },
  { id: 3, text: "Study React", completed: false }
]

function App() {
  const [task, setTask] = useState(() => {
    const savedTasks = localStorage.getItem('my_tasks')
    if(savedTasks !== null) {
      return JSON.parse(savedTasks)
    }
    return initialTasks
  })

useEffect(() => {
  localStorage.setItem('my_tasks', JSON.stringify(task))
}, [task])
  

function addTask(text) {
  if(text.trim() === ('')) {
    return
  }
  setTask([...task, {id: Date.now(), text: text, completed: false}])
}

function toggleTask(id) {
  setTask(task.map((t) => {
    if(t.id === id) {
      return {...t, completed: !t.completed}
    }
    return t
  }))
}

function deleteTask(id) {
  setTask(task.filter((t) => t.id !== id))
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