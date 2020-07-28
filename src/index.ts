import {bud} from './bud'
import {Bud} from './bud/types'

bud.features({
  css: true,
  scss: true,
  image: false,
  js: true,
  manifest: true,
  svg: true,
  terser: true,
  dependencyManifest: true,
  inlineManifest: true,
  vendor: true,
  splitting: true,
})

export {bud}
