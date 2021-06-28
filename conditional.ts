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

type FetchParams = number | Customer | Product

type FetchReturn<Param extends FetchParams> = Param extends Customer
  ? Order[]
  : Param extends Product
  ? Order[]
  : Order

function fetchOrder<Param extends FetchParams>(
  param: Param
): FetchReturn<Param> {}

fetchOrder(customer)
fetchOrder(2)

declare const ambiguous: Customer | number

fetchOrder(ambiguous)
