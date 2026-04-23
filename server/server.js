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


  

app.listen(3000, () => {
  console.log('Server is up and listens to port 3000')
})

