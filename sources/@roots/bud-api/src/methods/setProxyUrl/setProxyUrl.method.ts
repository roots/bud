import type {Bud} from '@roots/bud-framework'

export type Parameters = [string | URL | number]

export interface setProxyUrl {
  (...parameters: Parameters): Bud
}

export const setProxyUrl: setProxyUrl = function (this: Bud, url) {
  this.proxy(url)
  return this
}
