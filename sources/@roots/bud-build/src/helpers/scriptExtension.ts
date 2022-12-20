import type {Bud} from '@roots/bud-framework'

import {isMjs} from './isMjs.js'

export const scriptExtension = (
  filter: Bud[`hooks`][`filter`],
  mjs: `.${string}` = `.mjs`,
  js: `.${string}` = `.js`,
): `.${string}` => {
  return isMjs(filter) ? mjs : js
}
