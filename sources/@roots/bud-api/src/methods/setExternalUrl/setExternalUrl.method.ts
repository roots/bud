import type {Bud} from '@roots/bud-framework'

export type Parameters = [string | URL]

export interface setExternalUrl {
  (...parameters: Parameters): Bud
}

export const setExternalUrl: setExternalUrl = function (this: Bud, url) {
  const normalUrl = !(url instanceof URL) ? new URL(url) : url
  this.hooks.on(`dev.externalUrl`, normalUrl)
  return this
}
