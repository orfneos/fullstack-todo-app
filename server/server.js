require('dotenv').config()

const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])

const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const dbURI = process.env.MONGODB_URI

mongoose.connect(dbURI, { 
  serverSelectionTimeoutMS: 5000 
})
  .then(() => console.log('Connected to Cloud MongoDB!'))
  .catch(err => console.error('Cloud Connection Error:', err))

const tasksSchema = new mongoose.Schema({
  text: String,
  completed: { type: Boolean, default: false}
})

const Task = mongoose.model('Task', tasksSchema)

app.use(express.json())
app.use(cors())

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find()
    res.json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    res.status(500).json({message: 'Server error'})
  }
})

app.post('/api/tasks', async (req, res) => {
  try{
    const newTask = new Task({
      text: req.body.text,
    })
    const savedTask = await newTask.save()
    res.json(savedTask)
  } catch (error) {
    console.error('Error saving task:', error)
    res.status(500).json({message: 'Server error'})
  }
})

app.delete('/api/tasks/:id', async (req, res) =>{
  try{
    const id = req.params.id
    await Task.findByIdAndDelete(id)
    res.json({message: 'Task deleted successfully'})
  } catch (error) {
    console.error('Error deleting task:', error)
    res.status(500).json({message: 'Server error'})
  }
})

app.put('/api/tasks/:id', async (req, res) => {
  try{
    const id = req.params.id
    const foundTask = await Task.findById(id)
    foundTask.completed = !foundTask.completed
    await foundTask.save()
    res.json(foundTask)
  } catch (error) {
    console.error('Error updating task:', error)
    res.status(500).json({message:'Server error'})
    }
  })
  

app.listen(3000, () => {
  console.log('Server is up and listens to port 3000')
})

