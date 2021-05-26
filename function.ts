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
