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
