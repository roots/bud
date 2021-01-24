import * as wp from 'purgecss-with-wordpress'
import type {Module} from '@roots/bud-typings'

/**
 * Extension interface
 */
import './interfaces'

/**
 * Extension name
 */
export const name = '@roots/bud-purgecss'

/**
 * Extension config api
 */
export * as api from './api'

/**
 * Extension boot
 */
export const boot: Module.Boot = bud => {
  bud.store.set('presets.purgecss', {wp})
}
