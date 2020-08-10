import type {Bud} from '../types'

const svg = (bud: Bud) => ({
  test: bud.patterns.get('svg'),
  use: [bud.loaders.get('svgr'), bud.loaders.get('url')],
})

export {svg}
