const mongoose = require('mongoose')

const tasksSchema = new mongoose.Schema({
  text: String,
  completed: { type: Boolean, default: false}
})

const Task = mongoose.model('Task', tasksSchema)

module.exports = Task