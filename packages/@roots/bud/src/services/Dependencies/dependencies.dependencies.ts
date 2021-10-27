import {fs} from '@roots/bud-support'
export const {readJsonSync} = fs

import {lodash} from '@roots/bud-support'
export const {isEqual} = lodash

export {bind} from '@roots/bud-support'

import {execa} from '@roots/bud-support'
const {commandSync: $} = execa
export {$}

export {Dependencies as DependenciesManager} from '@roots/dependencies'
