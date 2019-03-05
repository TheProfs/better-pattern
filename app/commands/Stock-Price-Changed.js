'use strict'

class StockPriceChanged {
  constructor(stockPriceInput, toast, stockList) {
    this.stockPriceInput = stockPriceInput
    this.toast = toast
    this.stockList = stockList

    this.stockPriceInput.addEventListener('stock-price-changed', e => {
      this.execute(e.detail.price)
    })
  }

  execute(price) {
    this.stockList.addPrice(price)
    this.toast.text = `Stock Price changed to ${price}`
    this.toast.open()
  }
}
