type VideoFormatURLs = {
  format360p: URL
  format480p: URL
  format720p: URL
  format1080p: URL
}

declare const videos: VideoFormatURLs

declare function loadFormat(format: string): void

function isFormatAvailable(
  obj: VideoFormatURLs,
  key: string
): key is keyof VideoFormatURLs {
  return key in obj
}

type SubtitleURLs = {
  english: URL
  german: URL
  french: URL
}

function isSubtitleAvailable(
  obj: SubtitleURLs,
  key: string
): key is keyof SubtitleURLs {
  return key in obj
}

declare const subtitles: SubtitleURLs

function isAvailable<T extends object>(
  obj: T,
  key: string | number | symbol
): key is keyof T {
  return key in obj
}

// 两种方式, 一种直接指定泛型, 另一种更优雅,通过参数 ts 会自动推断泛型类型
isAvailable<SubtitleURLs>(subtitles, 'key')
isAvailable(subtitles, 'key')

const a = isAvailable({ name: 'SteFan' }, 'age')

type URLList = {
  [k: string]: URL
}

type Loaded<Key> = {
  format: Key
  loaded: boolean
}

async function loadFile<Formats extends URLList, Key extends keyof Formats>(
  fileFormats: Formats,
  format: Key
): Promise<Loaded<Key>> {
  const data = await fetch(fileFormats[format].href)
  return {
    format,
    loaded: data.response === 200
  }
}

const result = await loadFile(videos, 'format360p')
if (result.format !== 'format360p') {
  // result.format is now never!
  throw new Error('Your implementation is wrong')
}

type HD = Pick<VideoFormatURLs, 'format1080p' | 'format720p'>

type Format360 = {
  format360p: URL
}

type Format480 = {
  format480p: URL
}

type Format720 = {
  format720p: URL
}

type Format1080 = {
  format1080p: URL
}

// type AvailableFormats = Format360 | Format480 | Format720 | Format1080

// const hq: AvailableFormats = {
//   format720p: new URL('...'),
//   format1080p: new URL('...')
// } // OK!

type Split<Obj> = {
  [Prop in keyof Obj]: Record<Prop, Obj[Prop]>
}[keyof Obj]

type AvailableFormats = Split<VideoFormatURLs>

const lofi: AvailableFormats = {
  format360p: new URL('...'),
  format480p: new URL('...')
} // OK!

type UserPreferences = {
  format: keyof VideoFormatURLs
  subtitles: {
    active: boolean
    language: keyof SubtitleURLs
  }
  theme: 'dark' | 'light'
}

const defaultUP: UserPreferences = {
  format: 'format1080p',
  subtitles: {
    active: false,
    language: 'english'
  },
  theme: 'light'
}

function combinePreferences<UserPref extends Partial<UserPreferences>>(
  defaultP: UserPreferences,
  userP: UserPref
) {
  return { ...defaultP, ...userP }
}

const prefs = combinePreferences(defaultUP, {
  format: 'format720p',
  theme: 'dark'
})

console.log(prefs.theme)

type MyRequired<Obj> = {
  [Key in keyof Obj]-?: Obj[Key]
}

type Reu = MyRequired<OK>

type DeepReadonly<Obj> = {
  readonly [Key in keyof Obj]: DeepReadonly<Obj[Key]>
}

type ReadonlyUserPreferences = DeepReadonly<UserPreferences>

const userSettings: Partial<UserPreferences> = {
  format: 'format720p',
  theme: 'dark'
}

combinePreferences(defaultUP, userSettings)

type UserPreference = {
  format: '1080p' | '360p'
  subtitles: {
    active: boolean
    language: 'chinese' | 'english'
  }
  theme: 'dark' | 'light'
}

const defaultU: UserPreference = {
  format: '1080p',
  subtitles: {
    active: false,
    language: 'english'
  },
  theme: 'light'
}

function combinePreference(
  defaultP: UserPreference,
  userP: Partial<UserPreference>
) {
  return { ...defaultP, ...userP }
}

const Me = combinePreference(defaultU, {
  format: '360p',
  theme: 'dark'
})

console.log(Me.theme)
