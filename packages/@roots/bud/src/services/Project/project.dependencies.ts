export {bind} from '@roots/bud-support'

import {fs} from '@roots/bud-support'
export const {readFile, readJson, writeFile, remove} = fs

import globby from 'globby'
export {globby}

export {Project} from '@roots/bud-framework'
