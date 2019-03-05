'use strict'

class CommandExecutor {
  constructor(socket, commands) {
    this.socket = socket
    this.socket.on('paper-event', event => {
      if (this[event.name])
        this[event.name].executeRemote(event.data)
    })

    commands.forEach(command => {
      this[command.constructor.name] = command

      command.emit = (data, options) => {
        this.socket.emit('paper-event', Object.assign({
          name: command.constructor.name,
          data: data,
          options
        }))
      }
    })

    fetch('/events', { mode: 'cors' })
      .then(res => res.json())
      .then(async events => {
        for (const event of events) {
          if (this[event.name])
            await this[event.name].executeStored(event.data)
        }
      })
  }
}
