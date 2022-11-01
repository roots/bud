import type {Bud} from '@roots/bud-framework'

import type * as Rule from '../../rule/index.js'

/**
 * Returns {@link Rule} for `.csv` handling
 *
 * @public
 */
export const csv = ({build}: Bud): Rule.Interface =>
  build
    .makeRule()
    .setInclude([app => app.path()])
    .setTest(({hooks}) => hooks.filter(`pattern.csv`))
    .setUse([`csv`])
