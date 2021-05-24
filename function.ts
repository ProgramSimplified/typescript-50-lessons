type Result = {
  title: string
  url: string
  abstract: string
}

function search(query: string, tags?: string[]): Promise<Result[]> {
  let queryString = `?query=${query}`

  if (tags && tags.length) {
    queryString += `&tags=${tags.join()}`
  }

  return fetch(`/search${queryString}`).then((response) => response.json())
}

type SearchFn = typeof search

type Query = {
  query: string
  tags?: string[]
  assemble: Assemble
}

type Assemble = (includeTags: boolean) => string

const query: Query = {
  query: 'Ember',
  tags: ['javascript'],
  assemble(includeTags = false) {
    let query = `?query=${this.query}`
    if (includeTags && typeof this.tags !== 'undefined') {
      query += `&${this.tags.join(',')}`
    }
    return query
  }
}

declare function displaySearch(
  inputId: string,
  outputId: string,
  search: SearchFn
): void

displaySearch('searchField', 'result', function (query, tags) {
  return Promise.resolve([
    {
      title: `The ${query} test book`,
      url: `/${query}-design-patterns`,
      abstract: `A practical book on ${query}`
    }
  ])
})

const testSearch: SearchFn = function (term) {
  return Promise.resolve([
    {
      title: `The ${term} test book`,
      url: `/${term}-design-patterns`,
      abstract: `A practical book on ${term}`
    }
  ])
}
