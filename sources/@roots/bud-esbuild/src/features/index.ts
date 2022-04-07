import type {Extension} from '@roots/bud-framework'

import {jsFeature} from './esbuild-js'
import {tsFeature} from './esbuild-ts'

export const features: Extension.Plugin[] = [tsFeature, jsFeature]
