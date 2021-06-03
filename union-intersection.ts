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

type EventKind = 'webinar' | 'conference' | 'meetup'

let tomorrowsEvent: EventKind = 'concert' // not Ok!

function getEventTeaser(event: TechEvent) {
  switch (event.kind) {
    case 'conference':
      // We now know that I'm in type Conference
      return (
        `${event.title} (Conference), ` +
        // Suddenly I don't have to check for price as
        // TypeScript knows it will be there
        `priced at ${event.price} USD`
      )
    case 'meetup':
      // We now know that we're in type Meetup
      return (
        `${event.title} (Meetup), ` +
        // Suddenly we can say for sure that this
        // event will have a location, because the
        // type tells us
        `hosted at ${event.location}`
      )
    case 'webinar':
      // We now know that we're in type Webinar
      return (
        `${event.title} (Webinar), ` +
        // Suddenly we can say for sure that there will
        // be a URL
        `available online at ${event.url}`
      )
    default:
      throw new Error('Not sure what to do with that!')
  }
}

const script19 = {
  title: 'ScriptConf',
  date: new Date('2019-10-25'),
  capacity: 300,
  rsvp: 289,
  description: 'The feel-good JS conference',
  kind: 'conference' as const,
  price: 129,
  location: 'Central Linz',
  talks: [
    {
      speaker: 'Vitaly Friedman',
      title: 'Designing with Privacy in Mind',
      abstract: '...'
    }
  ]
}

getEventTeaser(script19)

type UnionType = {
  title: string
  value: 'a' | 'b' | 'c'
}

const value = {
  title: 'cTitle',
  value: 'a' as const
}

function func(value: UnionType) {
  return value
}

func(value)
