type Article = {
  title: string,
  price: number,
  vat: number,
  stock: number,
  description: string
}

function addVAT(price: number, vat = 0.2): number {
  return price * (1 + vat)
}

let deliveryAddresses: string[] = [
  '421 Smashing Hill, 90210',
  '221b Paw-ker Street',
  '4347 Whiskers-ia Lane'
]

function selectDeliveryAddress(addressOrIndex: unknown) {
  if (
    typeof addressOrIndex === 'number' &&
    addressOrIndex < deliveryAddresses.length
  ) {
    return deliveryAddresses[addressOrIndex]
  } else if (typeof addressOrIndex === 'string') {
    return addressOrIndex
  }
  return ''
}

const book = {
  title: 'Form Design Patterns by Adam Silver',
  price: 32.77,
  vat: 0.19,
  stock: 1000,
  description: 'A practical book on accessibility and forms'
}
