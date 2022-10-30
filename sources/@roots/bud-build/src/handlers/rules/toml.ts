import type {Bud} from '@roots/bud-framework'
import * as tomlParser from 'toml'

import type * as Rule from '../../rule/index.js'

/**
 * Returns {@link Rule} for `.toml` handling
 *
 * @public
 */
export const toml = ({build}: Bud): Rule.Interface =>
  build
    .makeRule()
    .setType(`json`)
    .setInclude([app => app.path()])
    .setTest(({hooks}) => hooks.filter(`pattern.toml`))
    .setParser({parse: tomlParser.parse})
