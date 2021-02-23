import './interfaces'
import {Module} from '@roots/bud-typings'
import * as Plugin from './imagemin'
import * as configFns from './api'

/**
 * Extension name
 */
export const name: Module['name'] = '@roots/bud-imagemin'

/**
 * Extension config methods
 */
export const api: Module['api'] = configFns

/**
 * Extension boot
 */
export const boot: Module['boot'] = ({use}) => use(Plugin)
