function TaskItem({task, toggleTask, deleteTask}) {
  

  return(
    <li 
      onClick={() => toggleTask(task._id)}
      className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition ${
        task.completed
          ? "bg-zinc-800 text-zinc-400"
          : "bg-black text-orange-400 hover:opacity-80"
      }`}
      >
        <span
          className={task.completed ? "line-through opacity-60" : ""}
        >
          {task.text}
        </span>
      
      <button 
        onClick={(e) => {
          e.stopPropagation()
          deleteTask(task._id)
        }}
        className="px-3 py-1 rounded-lg bg-orange-400 text-red-700 font-semibold opacity-70 transition"
        >
          Delete
        </button>
      </li>
  )


}
   
export default TaskItem