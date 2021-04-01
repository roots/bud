import {Module} from '@roots/bud-framework'

import {esbuildPlugin} from './esbuildPlugin'
import {tsFeature} from './esbuild-ts'
import {jsFeature} from './esbuild-js'

/**
 * @exports features
 */
export const features: Module[] = [
  esbuildPlugin,
  tsFeature,
  jsFeature,
]
