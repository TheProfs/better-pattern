'use strict'

class StockPriceRejected extends Command {
  constructor(socket, toast) {
    super(socket)

    this.toast = toast
  }

  execute(price) {
    this.run(price)
    this.emit(price, {
      store: true
    })
  }

  executeRemote(price) {
    this.run(price)
  }

  executeStored(price) {
    this.run(price)
  }

  run(price) {
    this.toast.text = `Stock Rejected for price: ${price}`
    this.toast.open()
  }
}
