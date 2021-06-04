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
