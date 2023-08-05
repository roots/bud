import type {Factory} from '@roots/bud-build/config'

import isUndefined from '@roots/bud-support/lodash/isUndefined'

export const dependencies: Factory<`dependencies`> = async ({
  hooks,
  root,
}) =>
  hooks
    .filter(`build.dependencies`, [])
    .filter(label => !isUndefined(root.children[label]))
