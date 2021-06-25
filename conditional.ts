type Customer = {
  customerId: number
  firstName: string
  lastName: string
}

const customer = {
  customerId: 1,
  firstName: 'Stefan',
  lastName: 'Baumgartner'
}

type Product = {
  productId: number
  title: string
  price: number
}

const product = {
  productId: 22,
  title: 'Form Design Patterns',
  price: 29
}

type Order = {
  orderId: number
  customer: Customer
  products: Product[]
  date: Date
}

function fetchOrder(customer: Customer): Order[]
function fetchOrder(product: Product): Order[]
function fetchOrder(orderId: number): Order
function fetchOrder(param: any): any {
  // Implementation to follow
}

fetchOrder(customer)
fetchOrder(2)
