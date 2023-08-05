import type {Bud} from '@roots/bud-framework'

import isMjs from '@roots/bud-build/helpers/isMjs'

const scriptExtension = (
  filter: Bud[`hooks`][`filter`],
  mjs: `.${string}` = `.mjs`,
  js: `.${string}` = `.js`,
): `.${string}` => {
  return isMjs(filter) ? mjs : js
}

export {scriptExtension as default}
