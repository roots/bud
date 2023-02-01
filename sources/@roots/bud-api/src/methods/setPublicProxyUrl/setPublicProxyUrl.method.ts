import type {Bud} from '@roots/bud-framework'

export type Parameters = [string | URL]

export interface setPublicProxyUrl {
  (...parameters: Parameters): Bud
}

export const setPublicProxyUrl: setPublicProxyUrl = function (
  this: Bud,
  url,
) {
  const normalUrl = !(url instanceof URL) ? new URL(url) : url
  this.hooks.on(`dev.publicProxyUrl`, normalUrl)
  return this
}
