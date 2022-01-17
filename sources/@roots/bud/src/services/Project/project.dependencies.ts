export {bind} from '@roots/bud-support'

import {fs, lodash} from '@roots/bud-support'
export const {readFile, readJson, writeFile, remove} = fs

export const {isString} = lodash

import globby from 'globby'
export {globby}

export {Project} from '@roots/bud-framework'
