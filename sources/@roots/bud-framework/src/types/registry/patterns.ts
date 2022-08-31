export interface Sync {
  js: RegExp
  css: RegExp
  font: RegExp
  image: RegExp
  modules: RegExp
  html: RegExp
  ts: RegExp
  sass: RegExp
  cssModule: RegExp
  sassModule: RegExp
  svg: RegExp
  vue: RegExp
  md: RegExp
  json: RegExp
  json5: RegExp
  toml: RegExp
  yml: RegExp
  xml: RegExp
  csv: RegExp
  webp: RegExp
}

export type SyncRegistry = {
  [P in keyof Sync as `pattern.${P & string}`]: Sync[P]
}

export interface Async {}

export type AsyncRegistry = {
  [P in keyof Async as `pattern.${P & string}`]: Async[P]
}

export type Registry = SyncRegistry & AsyncRegistry
