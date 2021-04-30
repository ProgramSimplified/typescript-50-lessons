type Article = {
  title: string
  price: number
  vat: number
  stock: number
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

const book: Article = {
  title: 'Form Design Patterns by Adam Silver',
  price: 32.77,
  vat: 0.19,
  stock: 1000,
  description: 'A practical book on accessibility and forms'
}

const movBackup = {
  title: 'Form Design Patterns by Adam Silver',
  price: 32.77,
  vat: 0.19,
  stock: 1000,
  description: 'A practical book on accessibility and forms',
  rating: 5
}

const movie: Article = movBackup

const shopitem = {
  title: 'Helvetica',
  price: 6.66,
  vat: 0.19,
  stock: 1000,
  description: '90 minutes of gushing about Helvetica',
  rating: 5
}

function createArticleElement(article: Article): string {
  const title = article.title
  const price = addVAT(article.price, article.vat)
  return `<h2>Buy ${title} for ${price}</h2>`
}

createArticleElement(shopitem)

