import {babel} from './babel'
import {css} from './css'
import {font} from './font'
import {image} from './image'
import {svg} from './svg'
import {loaders} from './loaders'
import {uses, Use, UsesHash} from './uses'

/**
 * Rules
 */
const rules = [babel, css, font, image, svg]

export {loaders, rules, uses}
export type {Use, UsesHash}
