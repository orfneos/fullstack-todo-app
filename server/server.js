const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

let initialTasks = [
  { id: 1, text: "Gym", completed: false },
  { id: 2, text: "Read", completed: true },
  { id: 3, text: "Study React", completed: false }
]

app.get('/api/tasks', (req, res) => {
  res.json(initialTasks)
})

app.post('/api/tasks', (req, res) => {
  const newTask = req.body
  initialTasks.push(newTask)
  res.json(newTask)
})

app.delete('/api/tasks/:id', (req, res) =>{
  const id = Number(req.params.id)
  initialTasks = initialTasks.filter((t) => t.id !== id)
  res.json({ message: 'Task Deleted'})
})

app.put('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id)
  initialTasks = initialTasks.map((t) => {
    if(t.id === id) {
      return {...t, completed: !t.completed}
    }
    return t
  })
  res.json({ message: 'Task Updated'})
})
  

app.listen(3000, () => {
  console.log('Server is up and listens to port 3000')
})