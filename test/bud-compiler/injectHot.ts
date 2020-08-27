import {injectHot} from '../../packages/bud-compiler/src/injectHot'
import {bud} from '@roots/bud'

const ava = require('ava')

bud.bundle('app', ['one.js', 'two.js'])
bud.bundle('foo', ['whoa.nana'])

ava('injects middleware on entrypoints', t => {
  const injected = injectHot({
    config: bud.config(bud),
    overlay: true,
    reload: true,
  })

  Object.entries(injected.entry).map(entrypoint =>
    entrypoint.includes('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&overlay=true')
  )
})
