export {readJsonSync} from 'fs-extra'
export {isEqual} from 'lodash'
export {bind} from 'helpful-decorators'

import execa from 'execa'
const {commandSync: $} = execa
export {$}

export {Dependencies as DependenciesManager} from '@roots/dependencies'
