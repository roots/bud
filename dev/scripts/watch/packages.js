const {readJson} = require('fs-extra')
const globby = require('globby')
const {join} = require('path')

const packages = function (baseDir) {
  this.repo = {}

  this.glob = [
    join(baseDir, 'packages/@roots/*'),
    {
      onlyDirectories: true,
    },
  ]

  this.init = async function () {
    const paths = await globby(...this.glob)

    await Promise.all(
      paths.map(async path => {
        const files = await globby([join(path, 'src/**/*')])
        const pkg = await readJson(join(path, `package.json`))

        this.set(path, {
          name: pkg.name,
          pkg,
          files,
          path,
        })
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
