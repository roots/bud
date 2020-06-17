const {existsSync} = require('fs-extra')
const {join} = require('path')

const configFiles = ({project, budpack}) => ({
  project: join(project, 'postcss.config.js'),
  budpack: join(budpack, 'postcss.config.js'),
})

/**
 * Postcss config
 */
const postcss = ({
  enabled = true,
  project,
  budpack,
}) => {
  const configs = configFiles({
    project,
    budpack,
  })

  return {
    enabled,
    configFile: existsSync(configs.project)
      ? configs.project
      : configs.budpack,
  }
}

module.exports = postcss
