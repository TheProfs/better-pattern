'use strict'

class StockPriceChanged {
  constructor(stockPriceInput, toast, stockList) {
    this.stockPriceInput = stockPriceInput
    this.toast = toast
    this.stockList = stockList

    this.stockPriceInput.addEventListener('stock-price-changed', e => {
      this.execute(e.detail.price)
      this.emit(e.detail.price, {
        store: true
      })
    })
  }

  execute(price) {
    this.stockList.addPrice(price)
    this.toast.text = `Stock Price changed to ${price}`
    this.toast.open()
  }

  executeRemote(price) {
    this.execute(price)
  }

  executeStored(price) {
    this.stockList.addPrice(price)
  }
}
