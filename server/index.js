'use strict'

const path = require('path')
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use('/demo', express.static(path.resolve(__dirname, '../app')))
app.use('/bower_components', express.static(path.resolve(__dirname, '../bower_components')))

server.listen(3000, () =>
  console.log('Listening on :3000. Visit http://localhost:3000/demo'))

io.on('connection', socket => {
  socket.on('paper-event', event => {
    socket.broadcast.emit('paper-event', event)
  })
})
