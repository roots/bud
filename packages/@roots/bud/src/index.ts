import './interface'
import './patch'
import {Bud as BudConstructor} from './Bud'
import {Framework} from '@roots/bud-framework'
import {services} from './services'

export declare type Bud = Framework
export const bud: Bud = new BudConstructor(services).bootstrap()
