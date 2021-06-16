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
