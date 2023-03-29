import type {Bud} from '@roots/bud-framework'

export type Parameters = [string | URL | number]

export interface setUrl {
  (...parameters: Parameters): Bud
}

export const setUrl: setUrl = function (this: Bud, url) {
  this.serve(url)
  return this
}
