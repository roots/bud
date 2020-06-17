const {existsSync} = require('fs-extra')
const {join} = require('path')

const configFiles = ({project, budpack}) => ({
  project: join(project, '.eslintrc.js'),
  budpack: join(budpack, '.eslintrc.js'),
})

/**
 * Eslint config
 */
const eslint = ({
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

module.exports = eslint