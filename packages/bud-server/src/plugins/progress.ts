import {ProgressPlugin} from 'webpack'

const progress = callback =>
  new ProgressPlugin({
    activeModules: true,
    modules: true,
    handler: callback,
  })

export {progress as default}
