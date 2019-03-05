'use strict'

class CommandExecutor {
  constructor(io, commands) {
    this.io = io

    commands.forEach(command => {
      this[command.constructor.name] = command
    })
  }
}
