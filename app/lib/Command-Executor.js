'use strict'

class CommandExecutor {
  constructor(commands) {
    this.commands = commands

    fetch('/events', { mode: 'cors' })
      .then(res => res.json())
      .then(async events => {
        for (const event of events) {
          const command = this.commands
            .find(command => command.constructor.name === event.name)

          if (command) command.executeStored(event.data)
        }
      })
  }
}

class Command {
  constructor(socket) {
    this.socket = socket
    this.socket.on('paper-event', event => {
      if (this.constructor.name === event.name)
        this.executeRemote(event.data)
    })
  }

  emit(data, options) {
    this.socket.emit('paper-event', Object.assign({
      name: this.constructor.name,
      data: data,
      options
    }))
  }
}
