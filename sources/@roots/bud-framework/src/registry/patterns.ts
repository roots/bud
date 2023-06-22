export interface Sync {
  css: RegExp
  cssModule: RegExp
  csv: RegExp
  font: RegExp
  html: RegExp
  image: RegExp
  js: RegExp
  json: RegExp
  json5: RegExp
  md: RegExp
  modules: RegExp
  sass: RegExp
  sassModule: RegExp
  svg: RegExp
  toml: RegExp
  ts: RegExp
  vue: RegExp
  webp: RegExp
  xml: RegExp
  yml: RegExp
}

export type SyncRegistry = {
  [P in keyof Sync as `pattern.${P & string}`]: Sync[P]
}

export interface Async {}

export type AsyncRegistry = {
  [P in keyof Async as `pattern.${P & string}`]: Async[P]
}

export type Registry = SyncRegistry & AsyncRegistry
