const {projectPath} = require('./util')

/**
 * Webpack resolves.
 */
const resolve = ({
  aliases,
}) => ({
  resolve:{
    alias: {
      '@blocks': projectPath('src/blocks'),
      '@components': projectPath('src/components'),
      '@extensions': projectPath('src/extensions'),
      '@hooks': projectPath('src/hooks'),
      ...aliases,
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.css',
    ],
    modules: [
      projectPath('node_modules'),
    ],
  },
})

module.exports = resolve
