import { useState } from "react"

function AddTaskForm({addTask}) {
  const [newTask, setNewTask] = useState('')

function handleSubmit() {
  if(newTask.trim() === '') return
  
  addTask(newTask)
  setNewTask('')
}

  return(
    <>
     <input value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
      <button onClick={handleSubmit}>Add</button>
    </>
   
  )
}

export default AddTaskForm