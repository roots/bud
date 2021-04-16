import './interface'
import {Framework} from '@roots/bud-framework'
import {services} from './services'
import {Bud as App} from './Bud'

/**
 * This "fixes" resize emitter warnings
 * @todo actually fix this
 */
require('events').EventEmitter.defaultMaxListeners = 20

export declare type Bud = Framework
export const bud: Bud = new App().bootstrap(services)
export {services}

export {Framework} from '@roots/bud-framework'
