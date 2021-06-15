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

function loadFile<Formats extends URLList>(
  fileFormats: Formats,
  format: string
) {}

loadFile({ name: new URL('/xxfs') }, 'age')
