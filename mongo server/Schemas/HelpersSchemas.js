module.exports = {
    getTotal:(queriedCart) => {
        return queriedCart.items.length ? queriedCart.items.reduce((accumulator,item) => {
            const priceDecimal = (accumulator.decimal || 0) + item.quantity * item.productID.priceDecimal
            const decimal = priceDecimal % 100
            const integer = Math.floor(priceDecimal / 100) + (accumulator.integer || 0) + (item.quantity * item.productID.priceInteger)
            return {integer, decimal}
        },{})
        : {integer:0,decimal:0  }
}
}