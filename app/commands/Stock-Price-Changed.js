'use strict'

class StockPriceChanged extends Command {
  constructor(socket, stockPriceInput, toast, stockList, StockPriceRejected) {
    super(socket)

    this.stockPriceInput = stockPriceInput
    this.toast = toast
    this.stockList = stockList
    this.StockPriceRejected = StockPriceRejected

    this.stockPriceInput.addEventListener('stock-price-changed', e => {
      this.execute(e.detail.price, { executeRemote: true, store: true })
    })
  }

  execute(price, options = {}) {
    if (+price > 40) {
      return this.StockPriceRejected.execute(price, { executeRemote: true })
    }

    this.stockList.addPrice(price)
    this.toast.text = `Stock Price changed to ${price}`
    this.toast.open()

    if (options.executeRemote)
      this.emit(price, { store: options.store })
  }

  executeRemote(price) {
    this.execute(price)
  }

  executeStored(price) {
    this.stockList.addPrice(price)
  }
}
