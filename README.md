# fullstack-todo-app

A fullstack Todo application where users can add, complete, and delete tasks. Data is stored permanently in a MongoDB database.

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS  
**Backend:** Node.js, Express  
**Database:** MongoDB Atlas

##  Key Features

- Full CRUD Operations
- Loading & Error states
- Persistent data with MongoDB Atlas
- Secure credentials with `.env`

##  Problem Solving

During development, encountered a **DNS Resolution** issue connecting to MongoDB Atlas (ISP restriction).  
**Solution:** Used Node.js `dns` module to manually set Google DNS servers (`8.8.8.8`).

## How to Run Locally

### Prerequisites
- Node.js installed

### Frontend
```bash
cd client
npm install
npm run dev
```

### Backend
```bash
cd server
npm install
node server.js
```

> **Note:** You need to create a `.env` file in the `/server` folder with your MongoDB connection string:
> `MONGODB_URI=your_connection_string`