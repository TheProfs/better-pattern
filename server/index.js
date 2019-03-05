'use strict'

const path = require('path')
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const events = []

app.use('/demo', express.static(path.resolve(__dirname, '../app')))
app.use('/bower_components', express.static(path.resolve(__dirname, '../bower_components')))

server.listen(3000, () =>
  console.log('Listening on :3000. Visit http://localhost:3000/demo'))


app.get('/events', (req, res) => {
  res.json(events)
})

io.on('connection', socket => {
  socket.on('paper-event', event => {
    if (event.options && event.options.store) {
      events.push(event)
    }

    socket.broadcast.emit('paper-event', event)
  })
})
