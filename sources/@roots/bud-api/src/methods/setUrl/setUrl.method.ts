import type {Bud} from '@roots/bud-framework'

export type Parameters = [`string` | URL]

export interface setUrl {
  (...parameters: Parameters): Bud
}

export const setUrl: setUrl = function (this: Bud, url) {
  const normalUrl = !(url instanceof URL) ? new URL(url) : url
  this.hooks.filter(`dev.url`, normalUrl)
  return this
}
