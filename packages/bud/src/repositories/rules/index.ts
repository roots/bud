import {js} from './js'
import {css} from './css'
import {font} from './font'
import {image} from './image'
import {svg} from './svg'

import type {RepositoryDefinition} from '@roots/bud-typings'

const rules: RepositoryDefinition = {
  name: 'rules',
  register: {js, css, font, image, svg},
}

export {rules as default}
