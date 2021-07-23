function DOMcreateElement<
  T extends string
>(
  element: T, properties: Props<T>,
  ...children: PossibleElements[]
): HTMLElement
function DOMcreateElement<
  F extends Fun
>(
  element: F, properties: Props<F>,
  ...children: PossibleElements[]
): HTMLElement
function DOMcreateElement(
  element: any, properties: any,
  ...children: PossibleElements[]
): HTMLElement {
  if(typeof element === 'function') {
    return element({
      ...nonNull(properties, {}),
      children
    });
  }
  return DOMparseNode(
    element,
    properties,
    children
  );
}

function nonNull<T, U>(val: T, fallback: U) {
  return Boolean(val) ? val : fallback
};

type Fun = (...args: any[]) => any;

type AllElementsKeys = keyof HTMLElementTagNameMap

type CreatedElement<T> = T extends AllElementsKeys ? HTMLElementTagNameMap[T]: HTMLElement

// CreatedElement<T> 为节点的类型
// Partial<CreatedElement<T>> 为节点内置属性的部分类型
type Props<T> = T extends Fun ? Parameters<T>[0] : T extends string ? Partial<CreatedElement<T>> : never

function DOMparseNode<T extends string>(element: T, properties: Props<T>, children: PossibleElements[]) {
  const el = Object.assign(
    document.createElement(element),
    properties
  );
  DOMparseChildren(children).forEach(child => {
    el.appendChild(child);
  });
  return el;
}

type PossibleElements = HTMLElement | Text | string

function DOMparseChildren(children: PossibleElements[]) {
  return children.map(child => {
    if (child === 'string') {
      return document.createTextNode(child)
    }
    return child;
  })
}

const Button = ({msg}) => {
  return <button onclick={() => alert(msg)}>
    <strong>Click me</strong>
  </button>
}

const el = (
  <div>
    <h1 className="what">Hello world</h1>
    <p>
      Lorem ipsum dolor sit, amet consectetur
      adipisicing elit. Quae sed consectetur
      placeat veritatis
      illo vitae quos aut unde doloribus, minima eveniet et
      eius voluptatibus minus aperiam
      sequi asperiores, odio ad?
    </p>
    <Button msg='Yay' />
    <Button msg='Nay' />
  </div>
  )

  document.body.appendChild(el)
