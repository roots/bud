import './interface'
import {Framework} from '@roots/bud-framework'
import {Bud as App, services} from './Bud'

declare type Bud = Framework
const bud: Bud = new App().bootstrap(services)

export {bud, services}
export {Bud, Framework}
