import {js} from './js'
import {css} from './css'
import {font} from './font'
import {image} from './image'
import {svg} from './svg'
import {loaders} from './loaders'
import {uses, Use} from './uses'

const rules = {
  repository: 'rules',
  contents: [js, css, font, image, svg],
}

export {loaders, rules, uses}
export type {Use}
