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

