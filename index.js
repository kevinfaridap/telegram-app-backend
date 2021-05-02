require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT
const PORT = process.env.PORT
const cors = require('cors')
const morgan = require('morgan')
const socket = require('socket.io')
const http = require('http')
const moment = require('moment')
moment.locale('id');
const { v4: uuidv4 } = require('uuid');
const messageModels = require('./src/models/messages')

// Awal socket.io
const httpServer = http.createServer(app)
const io = socket(httpServer, {
  cors: {
    origin: '*',
  }
})
 

// / socket io
io.on("connection", (socket) => {
  console.log("client terhubung dengan id " + socket.id);

  socket.on("initialUser", (idUser) => {
    socket.join(`user:${idUser}`)
    console.log(`user:${idUser}`);
  })

  socket.on('sendMessage', async (data, callback) => {
    const date = new Date()
    const timeNow = moment(date).format('LT')
    const dateNow = moment().format('LL')
    const dataMessage = { ...data, createdAt: timeNow, date: dateNow }
    io.to(`user:${data.idReceiver}`).emit('receiverMessage', dataMessage)
    // console.log('isi data', data);
    callback(dataMessage)
    console.log(dataMessage, 'isi data message');
    dataMessage.id = uuidv4()

    await messageModels.createMessages(dataMessage);
  })

  socket.on("disconnect", reason => {
    console.log("client disconnect " + reason);
  })

})







// === Akhir socket.io

const route = require('./src/routers/index')

app.use(express.urlencoded({ extended: false }))
// parse app JSON
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


app.use('/v1', route)

app.use('/image', express.static('./uploads'))

app.use('*', (req, res, next) => {
  const error = new Error('ERROR.........')
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  if (!err.status) {
    err.status = 500
  }
  res.json({
    message: err.message,
    status_error: err.status
  })
})

httpServer.listen(PORT, ()=>{
  console.log('server is running on port ' + PORT);
})


// app.listen(port, () => {
//   console.log('Server berjalan di port ' + port)
// })













// const express = require('express')
// const morgan = require('morgan')
// const socket = require('socket.io')
// const cors = require('cors')
// const http = require('http')
// const userRoute = require('./src/routes/user')
// const PORT = process.env.PORT || 4567

// const app = express()
// const httpServer = http.createServer(app)
// const io = socket(httpServer, {
//   cors: {
//     origin: '*',
//   }
// })

// // socket io
// io.on("connection", (socket)=>{
//   console.log("client terhubung dengan id " + socket.id );
  
//   let count = 0
//   socket.on('kirimMessage', (data)=>{
//     // messageModels.insetMessage(data)
//     socket.broadcast.emit('recMessage', count +' '+ data)
//     count ++
//     console.log(data);
//   })
  
  
  
//   socket.on("disconnect", reason=>{
//     console.log("client disconnect "+reason);
//   })
  
// })

// // res api
// app.use(morgan('dev'))
// app.use(cors())
// app.use(express.urlencoded({ extended: false }))
// app.use(express.json())



// httpServer.listen(PORT, ()=>{
//   console.log('server is running on port ' + PORT);
// })