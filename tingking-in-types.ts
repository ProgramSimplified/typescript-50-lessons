declare function loadFile(filename: string, cb: (result: string) => void)

const loadFilePromise = promisify(loadFile)

loadFilePromise('./package.json').then((result) => result.toUpperCase())

type FunctionWithCallback<T extends any[]> = (
  ...t: [...T, (...args: any) => any]
) => any

type InferArguments<T> = T extends (
  ...t: [...infer R, (...args: any) => any]
) => any
  ? R
  : never

type InferResults<T> = T extends (
  ...t: [...infer K, (res: infer R) => any]
) => any
  ? R
  : never

type PromisifiedFunction<T> = (
  ...args: InferArguments<T>
) => Promise<InferResults<T>>

function promisify<Fun extends FunctionWithCallback>(
  fun: Fun
): PromisifiedFunction<Fun> {
  return function (...args: InferArguments<Fun>) {
    return new Promise((resolve) => {
      fun.call(null, ...args, (result: InferResults<Fun>) => {
        resolve(result)
      })
    })
  }
}

function addAsync(x: number, y: number, cb: (result: number) => void) {
  cb(x + y)
}

const addProm = promisify(addAsync)
// x is number!
addProm(1, 2).then((x) => x)

type Widget = {
  toJSON(): {
    kind: 'Widget'
    data: Date
  }
}

type Item = {
  // Regular primitive types
  text: string
  count: number
  // Options get preserved
  choice: 'yes' | 'no' | null
  // Functions get dropped.
  func: () => void
  // Nested elements need to be parsed
  // as well
  nested: {
    isSaved: boolean
    data: [1, undefined, 2]
  }
  // A pointer to another type
  widget: Widget
  // The same object referenced again
  children?: Item[]
}

type JSONified<T> = JSONifiedValue<T extends { toJSON(): infer U } ? U : T>

type JSONifiedValue<T> = T extends string | number | boolean | null
  ? T
  : T extends Function
  ? never
  : T extends object
  ? JSONifiedObject<T>
  : T extends Array<infer U>
  ? JSONifiedArray<U>
  : never

type JSONifiedObject<T> = {
  [P in keyof T]: JSONified<T[P]>
}

type UndefinedAsNull<T> = T extends undefined ? null : T

type JSONifiedArray<T> = Array<UndefinedAsNull<JSONified<T>>>

class Serializer<T> {
  serialize(inp: T): string {
    return JSON.stringify(inp)
  }

  deserialize(inp: string): JSONified<T> {
    return JSON.parse(inp)
  }
}

const itemSerializer = new Serializer<Item>()

const serialization = itemSerializer.serialize(anItem)

const obj = itemSerializer.deserializer(serialization)
