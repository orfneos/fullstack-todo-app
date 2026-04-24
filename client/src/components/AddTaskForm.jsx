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
    <div className="flex gap-4">
      <input 
        value={newTask} 
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-3 rounded-xl bg-white text-black outline-none"
        /> 

        <button 
        onClick={handleSubmit}
        className="px-6 py-3 rounded-xl bg-black text-orange-400 font-semibold hover:opacity-80 transition shadow-xl"
        >Add</button>
    </div>
    </>
   
  )
}

export default AddTaskForm