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
