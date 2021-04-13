require('dotenv').config({ path: './config/config.env'})
const express = require('express')
const path = require('path')
const connectDB = require('./config/db')
const errorHandler = require('./middlewares/error')
const cors = require('cors')

// Connect DB
if(process.env.DATABASE == 'mongodb'){
  connectDB()
}  

const app = express()

app.use(express.json())

// Use uploads folder to save image
app.use('/api/uploads', express.static('uploads'))
// app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')))

// app.use(morgan('dev'))

app.use(cors())

app.use('/api', require('./routes/auth.route'))
app.use('/api', require('./routes/user.route'))
app.use('/api', require('./routes/game.route'))

// app.use((req, res) => {
//   res.status(404).json({
//       success: false,
//       error: "Page not found"
//   })
// })

// Error Handler (Should be last piece of middleware)
app.use(errorHandler)

if(process.env.NODE_ENV === 'production') {
  // app.use(express.static("client/build"))
  app.use(express.static(path.join(__dirname, 'client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

process.on('unhandledRejection', (err, Promise) => {
  console.log(`Logged Error: ${err}`)
  server.close(() => process.exit(1))
})