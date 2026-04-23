const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find()
    res.json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    res.status(500).json({message: 'Server error'})
  }
})

router.post('/', async (req, res) => {
  try{
    const newTask = new Task({
      text: req.body.text,
    })
    const savedTask = await newTask.save()
    res.status(201).json(savedTask)
  } catch (error) {
    console.error('Error saving task:', error)
    res.status(500).json({message: 'Server error'})
  }
})

router.delete('/:id', async (req, res) =>{
  try{
    const id = req.params.id
    const deletedTask = await Task.findByIdAndDelete(id)
    if(!deletedTask) {
      return res.status(404).json({message: 'Task not found'})
    }
    res.json({message: 'Task deleted successfully'})
  } catch (error) {
    console.error('Error deleting task:', error)
    res.status(500).json({message: 'Server error'})
  }
})

router.put('/:id', async (req, res) => {
  try{
    const id = req.params.id
    const updatedTask = await Task.findById(id)
    if(!updatedTask ) {
      return res.status(404).json({message: 'Task not found'})
    }
    updatedTask.completed = !updatedTask.completed
    await updatedTask.save()
    res.json(updatedTask)
  } catch (error) {
    console.error('Error updating task:', error)
    res.status(500).json({message:'Server error'})
    }
  })

  module.exports = router