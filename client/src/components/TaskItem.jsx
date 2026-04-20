function TaskItem({task, toggleTask, deleteTask}) {
  

  return(
    <li 
      onClick={() => toggleTask(task.id)}
      style={{textDecoration: task.completed ? 'line-through' : 'none'}}
      >
      {task.text}
      <button onClick={(e) => {e.stopPropagation()
        deleteTask(task.id)}
      }>Delete</button>
      </li>
  )


}
   
export default TaskItem