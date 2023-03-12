const jsonServer = require('json-server')
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')
const fs = require('fs')

const app = jsonServer.create()
const server = http.createServer(app)
const router = jsonServer.router('socket.json')
const middlewares = jsonServer.defaults()

app.use(cors())

app.use(middlewares)
app.use(router)

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log('A user connected')

  const messages = router.db.get('messages')
  socket.emit('update', messages)

  socket.on('create', (data) => {
    const messages = router.db.get('messages')
    messages.push(data).write()
    socket.emit('update', messages)
  })

  socket.on('disconnect', () => {
    router.db.set('messages', []).write()
  })
})

server.listen(3030, () => {
  console.log('Server is running')
})
