import Bud from '@roots/bud-types'
import Rule from '../Rule'

import * as css from './css'
import * as font from './font'
import * as html from './html'
import * as image from './image'
import * as js from './js'
import * as svg from './svg'

export default (bud: Bud): Bud.Rule.Products => ({
  html: new Rule(bud, html),
  image: new Rule(bud, image),
  js: new Rule(bud, js),
  svg: new Rule(bud, svg),
  css: new Rule(bud, css),
  font: new Rule(bud, font),
})
