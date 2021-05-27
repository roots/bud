# Hooks

Below is a work-in-progress index of all hooks registered by `@roots/bud` core packages.

Most `build` related hooks can be found in `@roots/bud-build`.

Most extensions related hooks can be found in `@roots/bud`.

| key                             | notes                                                             |
| ------------------------------- | ----------------------------------------------------------------- |
| build                           | builds webpack config                                             |
| before                          | called directly before build                                      |
| after                           | called directly after build.                                      |
| locations/project               | project path (absolute)                                           |
| locations/src                   | source path (relative to `locations/project`)                     |
| locations/dist                  | dist path (relative to `locations/project`)                       |
| locations/publicPath            | public path (default: `/`)                                        |
| locations/modules               | node_modules path (relative to `locations/project`)               |
| locations/storage               | storage dir for artifacts/cache (relative to `locations/project`) |
| locations/records               | webpack records json path (relative to `locations/storage`)       |
| build/bail                      | webpack.bail                                                      |
| build/cache                     | webpack.cache                                                     |
| build/context                   | webpack.context                                                   |
| build/devtool                   | webpack.devtool                                                   |
| build/entry                     | webpack.entry                                                     |
| build/experiments               | webpack.experiments                                               |
| build/externals                 | webpack.externals                                                 |
| build/infrastructureLogging     | webpack.infrastructureLogging                                     |
| build/mode                      | webpack.mode                                                      |
| build/name                      | webpack.name                                                      |
| build/node                      | webpack.node                                                      |
| build/output                    | webpack.output                                                    |
| build/output/path               | webpack.output.path                                               |
| build/output/pathinfo           | webpack.output.pathinfo                                           |
| build/output/publicPath         | webpack.output.publicPath                                         |
| build/output/filename           | webpack.output.filename                                           |
| build/optimization              | webpack.optimization                                              |
| build/optimization/emitOnErrors | webpack.optimization.emitOnErrors                                 |
| build/optimization/minimize     | webpack.optimization.minimize                                     |
| build/optimization/minimizer    | webpack.optimization.minimizer                                    |
| build/optimization/moduleIds    | webpack.optimization.moduleIds                                    |
| build/optimization/runtimeChunk | webpack.optimization.runtimeChunk                                 |
| build/optimization/splitChunks  | webpack.optimization.splitChunks                                  |
| build/parallelism               | webpack.parallelism                                               |
| build/performance               | webpack.performance                                               |
| build/plugins                   | webpack.plugins                                                   |
| build/profile                   | webpack.profile                                                   |
| build/recordsPath               | webpack.recordsPath                                               |
| build/resolve                   | webpack.resolve                                                   |
| build/resolve/alias             | webpack.resolve.alias                                             |
| build/resolve/extensions        | webpack.resolve.extensions                                        |
| build/resolve/modules           | webpack.resolve.modules                                           |
| build/stats                     | webpack.stats                                                     |
| build/target                    | webpack.target                                                    |
| build/watch                     | webpack.watch                                                     |
| build/watchOptions              | webpack.watchOptions                                              |
