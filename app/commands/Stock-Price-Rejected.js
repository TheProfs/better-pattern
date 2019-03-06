'use strict'

class StockPriceRejected extends Command {
  constructor(socket, toast) {
    super(socket)

    this.toast = toast
  }

  execute(price, options = {}) {
    this.toast.text = `Stock Rejected for price: ${price}`
    this.toast.open()

    if (options.executeRemote)
      this.emit(price, { store: options.store })
  }

  executeRemote(price) {
    this.execute(price)
  }

  executeStored(price) {
    this.execute(price)
  }
}
