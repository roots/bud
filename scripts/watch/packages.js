const {readJson} = require('fs-extra')
const globby = require('globby')
const {join} = require('path')

/**
 * Packages
 */
const packages = function () {
  this.repo = {}
  this.baseDir = process.cwd()
  this.glob = [
    join(this.baseDir, 'packages/*'),
    {
      onlyDirectories: true,
    },
  ]

  this.init = async function () {
    const paths = await globby(...this.glob)

    await Promise.all(
      paths.map(async path => {
        const files = await globby([join(path, 'src/**/*')])
        const {name} = await readJson(join(path, `package.json`))

        this.set(path, {name, files, path})
      }),
    )

    return this
  }

  this.entries = function () {
    return Object.entries(this.repo)
  }

  this.get = function (path) {
    return this.repo[path.split('/').pop()]
  }

  this.set = function (path, value) {
    this.repo[path.split('/').pop()] = value
  }
}

module.exports = packages
