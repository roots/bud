const packages = require('./packages')
const watcher = require('./watcher')
const {watchFile} = require('fs-extra')

/**
 * Dev: Watch mode
 */
;(async function () {
  try {
    const src = await new packages().init()

    await Promise.all(
      src.entries().map(async ([name, pkg]) => {
        await Promise.all(
          pkg.files.map(async file => {
            watchFile(file, watcher(pkg))
          }),
        )

        return true
      }),
    )
  } catch (err) {
    console.error(err)
  }
})()
