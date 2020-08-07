import type {Bud} from '../types'

const babel = (bud: Bud) => ({
  test: bud.patterns.get('js'),
  exclude: bud.patterns.get('vendor'),
  use: [
    {
      loader: bud.loaders.get('babel'),
      options: {
        cacheDirectory: true,
        cacheCompression: bud.inProduction,
        ...bud.options.get('babel'),
      },
    },
  ],
})

export {babel}
