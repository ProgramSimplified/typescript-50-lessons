type Article = {
  title: string
  price: number
  vat: number
  stock?: number
  description?: string
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

const defaultOrder = {
  articles: [
    {
      price: 1200.5,
      vat: 0.2,
      title: 'Macbook Air Refurbished - 2013'
    },
    {
      price: 9,
      vat: 0,
      title: 'I feel smashing subscription'
    }
  ],
  customer: {
    name: 'Fritz Furball',
    address: {
      city: 'Smashing Hill',
      zip: '90210',
      street: 'Whisker-ia Lane',
      number: '1337'
    },
    dateOfBirth: new Date(2006, 9, 1)
  }
}

type Order = typeof defaultOrder

function checkOrders(orders: Order[]) {
  let valid = true
  for (let order of orders) {
    valid = valid && order.articles.length > 0
  }

  return valid
}

class Discount {
  isPercentage: boolean
  amount: number

  constructor(isPercentage: boolean, amount: number) {
    this.isPercentage = isPercentage
    this.amount = amount
  }

  apply(article: Article) {
    if (this.isPercentage) {
      article.price = article.price - article.price * this.amount
    } else {
      article.price = article.price - this.amount
    }
  }
}

let discount: Discount = new Discount(true, 0.2)
let allProductsTwentyBucks: Discount = {
  isPercentage: false,
  amount: 20,
  apply(article) {
    article.price = 20
  }
}

class TwentyPercentDiscount extends Discount {
  constructor() {
    super(true, 0.2)
  }

  apply(article: Article) {
    if (this.isValidForDiscount(article)) {
      super.apply(article)
    }
  }

  isValidForDiscount(article: Article) {
    return article.price <= 40
  }
}

let disco1: Discount = new TwentyPercentDiscount()
// let disco2: TwentyPercentDiscount = new Discount(true, 0.3)

interface ShopItem {
  title: string;
  price: number;
  vat: number;
  stock?: number;
  description?: string;
}

const shopItem: ShopItem = {
  title: 'Inclusive components',
  price: 30,
  vat: 0.2
}

discount.apply(shopItem)

class DVD implements ShopItem {
  title: string
  price: number
  vat: number

  constructor(title: string) {
    this.title = title
    this.price = 9.99
    this.vat = 0.2
  }
}

class Book implements Article {
  title: string
  price: number
  vat: number

  constructor(title: string) {
    this.title = title
    this.price = 39
    this.vat = 0.2
  }
}

let book = new Book('Art Direction on the Web')
discount.apply(book)

let dvd = new DVD('Contagion')
discount.apply(dvd)

class ArticlePrivate {
  public title: string
  private price: number

  constructor(title: string, price: number) {
    this.title = title
    this.price = price
  }
}

const article = new ArticlePrivate('Smashing Book 6', 39)

// Error: Property 'price' is private and only accessible within class 'ArticlePrivate'
console.log(article.price)