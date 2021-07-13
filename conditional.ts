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

type FetchByProductOrId = FetchReturn<Product | number | Customer>

type FetchReturn2<Param extends FetchParams> = [Param] extends [Customer]
  ? Order[]
  : [Param] extends [Product]
  ? Order[]
  : Order

type FetchByCustomer = FetchReturn<Customer | number>

type TypeName<T> = [T] extends [string]
  ? string
  : [T] extends [number]
  ? number
  : [T] extends [boolean]
  ? boolean
  : [T] extends [undefined]
  ? undefined
  : [T] extends [Function]
  ? Function
  : object

type T4 = TypeName<string | string[]>

type Medium = {
  id: number
  title: string
  artist: string
}

type TrackInfo = {
  duration: number
  tracks: number
}

type CD = Medium &
  TrackInfo & {
    kind: 'cd'
  }

type LP = Medium & {
  sides: {
    a: TrackInfo
    b: TrackInfo
  }
  kind: 'lp'
}

type AllMedia = CD | LP
type MediaKinds = AllMedia['kind'] // 'lp' | 'cd'

declare function createMedium<Kin extends MediaKinds>(kind: Kin, info): AllMedia

type SelectBranch<Branch, Kin> = Branch extends { kind: Kin } ? Branch : never

type SelectCD = SelectBranch<AllMedia, 'cd'>

type A = 'lp' | 'ss' extends MediaKinds ? 'ok' : never

type B = {
  kind: string
  aa: string
}

type Extract2<A, B> = [A] extends [B] ? A : never

type BB = Extract2<'lp', MediaKinds>

type Removable = 'kind' | 'id'

type Remove<A, B> = A extends B ? never : A

type CDKeys = keyof CD

type CDInfoKeys = Remove<CDKeys, Removable>

type CDInfo = Pick<CD, Exclude<keyof CD, 'kind' | 'id'>>

// type CDInfo = Omit<CD, 'kind' | 'id'>

let userId = 0

function createUser(
  name: string,
  role: 'admin' | 'maintenance' | 'shipping',
  isActive: boolean
) {
  return {
    userId: userId++,
    name,
    role,
    isActive,
    createAt: new Date()
  }
}

const user = createUser('Stefan', 'shipping', true)

type User = ReturnType<typeof createUser>

type ParamType<T> = T extends (...args: (infer P)[]) => any ? P : T

interface Userss {
  name: string
  age: number
}

type Func = (user: Userss) => void

type Param = ParamType<Func>
type AA = ParamType<string>
