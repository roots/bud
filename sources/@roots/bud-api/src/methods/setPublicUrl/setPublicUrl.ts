import type {Bud} from '@roots/bud-framework'

export type Parameters = [string | URL]

export interface setPublicUrl {
  (...parameters: Parameters): Bud
}

export const setPublicUrl: setPublicUrl = function (this: Bud, url) {
  const normalUrl = !(url instanceof URL) ? new URL(url) : url
  this.hooks.on(`dev.publicUrl`, normalUrl)
  return this
}
