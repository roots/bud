import './interface'
import './patch'

import {Framework} from '@roots/bud-framework'
import {services} from './services'
import {Bud as BudConstructor} from './Bud'

export declare type Bud = Framework
export const bud: Bud = new BudConstructor(services).bootstrap()
