import type {Module} from '@roots/bud-framework'

import {jsFeature} from './esbuild-js'
import {tsFeature} from './esbuild-ts'

export const features: Module[] = [tsFeature, jsFeature]
