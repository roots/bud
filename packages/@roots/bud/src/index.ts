import './interface'
import {Framework} from '@roots/bud-framework'
import {services} from './services'
import {Bud as BudConstructor} from './Bud'

/**
 * This "fixes" resize emitter warnings
 * @todo actually fix this
 */
require('events').EventEmitter.defaultMaxListeners = 20

export declare type Bud = Framework
export const bud: Bud = new BudConstructor(services).bootstrap()
