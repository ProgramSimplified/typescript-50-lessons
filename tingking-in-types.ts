declare function loadFile(filename: string, cb: (result: string) => void)

const loadFilePromise = promisefy(loadFile)

loadFilePromise('./package.json').then((result) => result.toUpperCase())

declare function promisefy<Fun extends FunctionWithCallback>(
  fun: Fun
): PromisefiedFunction<Fun>
