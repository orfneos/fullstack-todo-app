function TaskItem({task, toggleTask, deleteTask}) {
  

  return(
    <li 
      onClick={() => toggleTask(task._id)}
      style={{textDecoration: task.completed ? 'line-through' : 'none'}}
      >
      {task.text}
      <button onClick={(e) => {e.stopPropagation()
        deleteTask(task._id)}
      }>Delete</button>
      </li>
  )


}
   
export default TaskItem