import isUndefined from '@roots/bud-support/lodash/isUndefined'

import type {Factory} from './index.js'

export const dependencies: Factory<`dependencies`> = async ({
  hooks,
  root,
}) =>
  hooks
    .filter(`build.dependencies`, [])
    .filter(label => !isUndefined(root.children[label]))
