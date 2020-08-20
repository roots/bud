import {js} from './js'
import {css} from './css'
import {font} from './font'
import {image} from './image'
import {svg} from './svg'
import {loaders} from './loaders'
import {uses, Use, UsesHash} from './uses'

const rules = [js, css, font, image, svg]

export {loaders, rules, uses}
export type {Use, UsesHash}
