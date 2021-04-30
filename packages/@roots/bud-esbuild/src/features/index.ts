import type {Module} from '@roots/bud-extensions'
import {tsFeature} from './esbuild-ts'
import {jsFeature} from './esbuild-js'

/**
 * @exports features
 */
export const features: Module[] = [tsFeature, jsFeature]
