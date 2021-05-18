import type {Module} from '@roots/bud-framework'
import {tsFeature} from './esbuild-ts'
import {jsFeature} from './esbuild-js'

export const features: Module[] = [tsFeature, jsFeature]
