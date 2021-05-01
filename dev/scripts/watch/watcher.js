const execa = require('execa')

const getPackageDir = name => `${process.cwd()}/packages/${name}`

const rebuild = async () => {
  console.log('Cleaning and rebuilding everything.')
  execa('yarn', ['make']).stdout.pipe(process.stdout)
}

const watcher = ({name}) => {
  const cwd = getPackageDir(name)

  return async () => {
    console.log(`Changes detected. Rebuilding: ${cwd}`)

    try {
      execa('yarn', ['build'], {cwd}).stdout.pipe(process.stdout)
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
