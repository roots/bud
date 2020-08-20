const {sync: run} = require('execa')
const chalk = require('chalk')

/**
 * Do release. Do!!
 */
const release = (async () => {
  console.clear()
  console.log(chalk.bgBlue('Linting packages'))
  const typingsLint = run('yarn', ['lint'])
  console.log(chalk.dim(typingsLint.stdout))

  console.clear()
  console.log(chalk.bgBlue('Linting @roots/bud-typings'))
  const typingsBuild = run('yarn', ['workspace', '@roots/bud-typings', 'build'])
  console.log(chalk.dim(typingsBuild.stdout))

  console.clear()
  console.log(chalk.bgBlue('Building @roots/bud'))
  const budBuild = run('yarn', ['workspace', '@roots/bud', 'build'])
  console.log(budBuild.stdout)

  console.clear()
  console.log(chalk.bgBlue('Building @roots/bud-dependency-extraction'))
  const extractionBuild = run('yarn', ['workspace', '@roots/bud-dependency-extraction', 'build'])
  console.log(extractionBuild.stdout)

  console.clear()
  console.log(chalk.bgBlue('Building @roots/bud-eslint'))
  const eslintBuild = run('yarn', ['workspace', '@roots/bud-eslint', 'build'])
  console.log(eslintBuild.stdout)

  console.clear()
  console.log(chalk.bgBlue('Building @roots/bud-purgecss'))
  const purgeBuild = run('yarn', ['workspace', '@roots/bud-purgecss', 'build'])
  console.log(purgeBuild.stdout)

  console.clear()
  console.log(chalk.bgBlue('Building @roots/bud-sage'))
  const sageBuild = run('yarn', ['workspace', '@roots/bud-sage', 'build'])
  console.log(sageBuild.stdout)

  console.clear()
  console.log(chalk.bgBlue('Building @roots/bud-sass'))
  const sassBuild = run('yarn', ['workspace', '@roots/bud-sass', 'build'])
  console.log(sassBuild.stdout)

  console.clear()
  console.log(chalk.bgBlue('Building @roots/bud-stylelint'))
  const stylelintBuild = run('yarn', ['workspace', '@roots/bud-stylelint', 'build'])
  console.log(stylelintBuild.stdout)

  console.clear()
  console.log(chalk.bgBlue('Building @roots/bud-tailwind'))
  const tailwindBuild = run('yarn', ['workspace', '@roots/bud-tailwind', 'build'])
  console.log(tailwindBuild.stdout)

  console.clear()
  console.log(chalk.bgBlue('Building @roots/bud-typescript'))
  const typescriptBuild = run('yarn', ['workspace', '@roots/bud-typescript', 'build'])
  console.log(typescriptBuild.stdout)

  console.clear()
  console.log(chalk.bgBlue('Building @roots/bud-vue'))
  const vueBuild = run('yarn', ['workspace', '@roots/bud-vue', 'build'])
  console.log(vueBuild.stdout)

  console.clear()
  console.log(chalk.bgBlue('Testing'))
  const ava = run('yarn', ['test:coverage'])
  console.log(ava.stdout)

  // ... increment versions in package.json files
  // ... git
  // ... publish (github action?)
})()

module.exports = release
