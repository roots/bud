import type {BabelTransformOptions} from '@roots/bud-types'

const presets = [
  [
    require.resolve('@babel/preset-env'),
    {
      modules: false,
      forceAllTransforms: true,
    },
  ],
]

const plugins = [
  require.resolve('@babel/plugin-syntax-dynamic-import'),
  require.resolve('@babel/plugin-proposal-object-rest-spread'),
  [
    require.resolve('@babel/plugin-transform-runtime'),
    {
      helpers: false,
    },
  ],
]

const babel: BabelTransformOptions = {
  presets,
  plugins,
}

export {babel as default}
