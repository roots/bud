import {bind, fs, lodash, Signale} from '@roots/bud-support'

const {isEqual} = lodash
const {readJsonSync} = fs

export {bind, isEqual, readJsonSync, Signale}

export {Dependencies as DependenciesManager} from '@roots/dependencies'
