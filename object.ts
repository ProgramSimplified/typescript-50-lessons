function print(msg: any) {
  if (typeof msg === 'string') {
    // We know msg is a string
    console.log(msg.toUpperCase()) // OK!
  } else if (typeof msg === 'number') {
    // I know msg is a number
    console.log(msg.toFixed(2)) // OK!
  }
}

function print2(obj: any) {
  if (typeof obj === 'object' && 'prop' in obj) {
    console.assert(typeof obj.prop !== 'undefined')
  }
  if (typeof obj === 'object' && obj.hasOwnProperty('prop')) {
    console.assert(typeof obj.prop !== 'undefined')
  }
}

// function hasOwnProperty<X extends {}, Y extends PropertyKey>(
//   obj: X,
//   prop: Y
// ): obj is X & Record<'name', unknown> {
//   return obj.hasOwnProperty(prop)
// }

interface Object {
  hasOwnProperty<X extends {}, Y extends PropertyKey>(
    this: X,
    prop: Y
  ): this is X & Record<Y, unknown>
}

let person = {}

if (typeof person === 'object' && person.hasOwnProperty('name')) {
  console.log(person.name)
}

const storage2 = {
  currentValue: 0
}

Object.defineProperty(storage2, 'maxValue', {
  value: 9001,
  writable: false
})

console.log(storage2.maxValue)

type InferValue<Prop extends PropertyKey, Desc> = Desc extends {
  get(): any
  value: any
}
  ? never
  : Desc extends { value: infer T }
  ? Record<Prop, T>
  : Desc extends { get(): infer T }
  ? Record<Prop, T>
  : never

type DefineProperty<
  Prop extends PropertyKey,
  Desc extends PropertyDescriptor
> = Desc extends {
  writable: any
  set(val: any): any
}
  ? never
  : Desc extends {
      writable: any
      get(): any
    }
  ? never
  : Desc extends {
      writable: false
    }
  ? Readonly<InferValue<Prop, Desc>>
  : Desc extends {
      writable: true
    }
  ? InferValue<Prop, Desc>
  : Readonly<InferValue<Prop, Desc>>

interface ObjectConstructor {
  defineProperty<
    Obj extends object,
    Key extends PropertyKey,
    PDesc extends PropertyDescriptor
  >(
    obj: Obj,
    prop: Key,
    val: PDesc
  ): asserts obj is Obj & DefineProperty<Key, PDesc>
}
