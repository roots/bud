const packages = require('./packages')
const watcher = require('./watcher')
const {watchFile} = require('fs-extra')

/**
 * Dev: Watch mode
 */
;(async function () {
  const all = await new packages().init()

  console.log('\nWatching for changes in:\n')

  all.entries().map(pkg => console.log(pkg[1].name))

  await Promise.all(
    all.entries().map(async ([name, pkg]) => {
      await Promise.all(
        pkg.files.map(file => {
          return watchFile(file, watcher)
        }),
      )

      return true
    }),
  )
})()
