'use strict'

class StockPriceChanged extends Command {
  constructor(socket, stockPriceInput, toast, stockList, StockPriceRejected) {
    super(socket)

    this.stockPriceInput = stockPriceInput
    this.toast = toast
    this.stockList = stockList
    this.StockPriceRejected = StockPriceRejected

    this.stockPriceInput.addEventListener('stock-price-changed', e => {
      this._handleLocalStockPriceChange(e.detail.price)
    })
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
    this.stockList.addPrice(price)
  }

  run(price) {
    this.stockList.addPrice(price)
    this.toast.text = `Stock Price changed to ${price}`
    this.toast.open()
  }

  _handleLocalStockPriceChange(price) {
    if (+price > 40) {
      return this.StockPriceRejected.execute(price)
    }

    this.execute(price)
  }
}
