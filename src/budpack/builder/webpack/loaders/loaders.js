import {babel} from './babel'
import {eslint} from './eslint'
import {resources} from './resources'
import {style} from './style'
import {typescript} from './typescript'

/**
 * Webpack loaders
 */
const loaders = ({features, options, configs, paths}) => ({
  module: {
    strictExportPresence: true,
    rules: [
      ...(configs.eslint ? [eslint(configs, paths)] : []),
      ...(features.babel && options.babel
        ? [babel(options, paths)]
        : []),
      ...(features.typescript && options.typescript
        ? [typescript(options)]
        : []),
      style(options, features, paths),
      ...resources(options),
    ],
  },
})

export {loaders}
