const execa = require('execa')

const getPackageDir = name => `${process.cwd()}/packages/${name}`

const rebuild = async () => {
  console.log('Cleaning and rebuilding everything.')
  execa('yarn', ['make']).stdout.pipe(process.stdout)
}

const watcher = pkg => {
  return async (event, file) => {
    console.log(
      `Changes detected. Rebuilding: ${getPackageDir(pkg.name)}`,
    )

    try {
      execa('yarn', ['build'], {
        cwd: getPackageDir(pkg.name),
      }).stdout.pipe(process.stdout)
    } catch (err) {
      try {
        console.log(err)
        console.log(`Rebuilding..`)
        await rebuild()
      } catch (err) {
        console.log(err)
      }
    }

    return true
  }
}

module.exports = watcher
