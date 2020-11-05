const {readJson} = require('fs-extra')
const globby = require('globby')
const {join} = require('path')

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

        const json = await readJson(join(path, `package.json`))

        this.set(path, {
          name: json.name,
          files,
          path,
          busy: false,
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

  this.getFromPath = function (path) {
    const key = join(
      this.baseDir,
      path.replace(this.baseDir, '').split('/')[0],
    )

    return this.repo[key]
  }

  this.set = function (path, value) {
    this.repo[path.split('/').pop()] = value
  }
}

module.exports = packages
