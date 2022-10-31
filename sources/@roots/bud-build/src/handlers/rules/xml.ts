import type {Bud} from '@roots/bud-framework'

import type * as Rule from '../../rule/index.js'

/**
 * Returns {@link Rule} for `.xml` handling
 *
 * @public
 */
export const xml = ({build}: Bud): Rule.Interface =>
  build
    .makeRule()
    .setInclude([app => app.path()])
    .setTest(({hooks}) => hooks.filter(`pattern.xml`))
    .setUse([`xml`])
