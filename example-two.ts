function addVAT(price: number, vat = 0.2): number {
  return price * (1 + vat)
}

const vatPriceWrong = addVAT(100, 0.2)