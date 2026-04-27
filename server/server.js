require('dotenv').config()

const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])

const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const dbURI = process.env.MONGODB_URI
const Task = require('./models/Task')
const taskRoutes = require('./routes/taskRoutes')


mongoose.connect(dbURI, { 
  serverSelectionTimeoutMS: 5000 
})
  .then(() => console.log('Connected to Cloud MongoDB!'))
  .catch(err => console.error('Cloud Connection Error:', err))

  
app.use(express.json())
app.use(cors())
app.use('/api/tasks', taskRoutes)


  

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

