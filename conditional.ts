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

type Callback<Res> = (result: Res) => void

type FetchCb<T extends FetchParams> = Callback<FetchReturn<T>>

type AsyncResult<FHead, Par extends FetchParams> = FHead extends [
  Par,
  FetchCb<Par>
]
  ? void
  : FHead extends [Par]
  ? Promise<FetchReturn<Par>>
  : never

function fetchOrder<Par extends FetchParams>(
  inp: Par,
  fun?: Callback<FetchReturn<Par>>
): Promise<FetchReturn<Par>> | void {
  // Fetch the result
  const res = fetch(`/backend?inp=${JSON.stringify(inp)}`).then((res) =>
    res.json()
  )

  // If there's a callback, call it
  if (fun) {
    res.then((result) => {
      fun(result)
    })
  } else {
    // Otherwise return the result promise
    return res
  }
}
