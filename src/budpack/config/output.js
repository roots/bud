const {projectPath, isProduction} = require('./util')

const output = ({dev}) => ({
  output: {
    path: projectPath('dist/'),
    publicPath: isProduction ? `/dist` : `//${dev.host}:${dev.port}/dist/`,
    filename: '[name].[hash].js',
  },
})

module.exports = output
