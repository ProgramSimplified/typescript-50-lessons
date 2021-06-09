type Talk = {
  abstract: string
  speaker: string
  title: string
}

type TechEventBase = {
  title: string
  description: string
  date: Date
  capacity: number
  rsvp: number
  kind: string
}

type Conference = TechEventBase & {
  location: string
  price: number
  talks: Talk[]
  kind: 'conference'
}

type Meetup = TechEventBase & {
  location: string
  price: string
  talks: Talk[]
  kind: 'meetup'
}

type Webinar = TechEventBase & {
  url: string
  price?: number
  talks: Talk
  kind: 'webinar'
}

type TechEvent = Webinar | Conference | Meetup

function filterByKind(list: TechEvent[], kind: EventKind): TechEvent[] {
  return list.filter((el) => el.kind === kind)
}

type EventKind = TechEvent['kind']

type GroupedEvents = {
  [Kind in EventKind]: TechEvent[]
}

function groupEvents(events: TechEvent[]): GroupedEvents {
  const grouped: any = {
    conference: [],
    meetup: [],
    webinar: []
  }
  events.forEach((el) => {
    grouped[el.kind].push(el)
  })
  return grouped
}

function getTeaserHTML(event: TechEvent) {
  return `<h2>${event.title}</h2>
    <p>
      ${event.description}
    </p>
  `
}

function getTeaserListElement(event: TechEvent) {
  const content = getTeaserHTML(event)
  const element = document.createElement('li')
  element.classList.add('teaser-card')
  element.innerHTML = content
  return element
}

function appendEventToList(event: TechEvent) {
  const list = document.querySelector('#event-list')
  const element = getTeaserListElement(event)
  list?.append(element)
}

function tail<T extends any[]>(arr: readonly [any, ...T]) {
  const [_ignored, ...rest] = arr
  return rest
}

type List = [string, number, ...string[]]

const list: List = ['1', 2]
