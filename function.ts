type Result = {
  title: string
  url: string
  abstract: string
}

function search(
  query: string,
  callback: (results: Result[]) => void,
  tags?: string[]
) {
  let queryString = `?query=${query}`

  if (tags && tags.length) {
    queryString += `&tags=${tags.join()}`
  }

  fetch(`/search${queryString}`)
    .then((response) => response.json() as Promise<Result[]>)
    .then((results) => void callback(results))
}

search('Ember', function (results) {
  console.log(results)
})

type SearchFn = typeof search

function displaySearch(
  inputId: string,
  outputId: string,
  search: SearchFn
): void {
  document
    .getElementById(inputId)
    ?.addEventListener('change', inputChangeHandler)
}

function inputChangeHandler(this: HTMLInputElement, ev: Event) {
  this.parentElement?.classList.add('active')
}

const result = {
  title: 'A guide to @@starthl@@Ember@@endhl@@.js',
  url: '/a-guide-to-ember',
  description: `The framework @@starthl@@Ember@@endhl@@.js
     in a nutshell`
}

let markup = highlight`<li>${result.title}</li>`

function highlight(strings: TemplateStringsArray, ...values: string[]) {
  let str = ''
  strings.forEach((templ, i) => {
    let expr =
      values[i]?.replace('@@start@@', '<em>').replace('@@end@@', '</em>') ?? ''

    str += templ + expr
  })
  return str
}
