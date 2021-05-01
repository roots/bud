const packages = require('./packages')
const watcher = require('./watcher')
const {watchFile} = require('fs-extra')

watch(process.cwd())

async function watch(baseDir) {
  try {
    const src = await new packages(baseDir).init()

    Object.keys(src.repo).map(repo =>
      console.log(`Watching ${repo}`),
    )

    await Promise.all(
      src.entries().map(async ([_name, pkg]) => {
        await Promise.all(
          pkg.files.map(async file =>
            watchFile(file, watcher(pkg)),
          ),
        )
      }),
    )
  } catch (err) {
    console.error(err)
  }
}
