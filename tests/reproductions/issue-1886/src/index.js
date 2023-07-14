import './index.css'

import webp from '@src/images/bud.png?as=webp'
import webp50 from '@src/images/bud-50.png?as=webp@50'
import jpg from '@src/images/bud.png?as=jpeg'

import svg from '@src/images/bud.svg'
import inlineSvg from '@src/images/bud.svg?inline'

console.log(webp, jpg, webp50, svg)

assert(inlineSvg)
