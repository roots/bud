const packages = require('./packages')
const watcher = require('./watcher')
const {watchFile} = require('fs-extra')

/**
 * Dev: Watch mode
 */
;(async function () {
  console.log('\nWatching for changes in:\n')

  const allPackages = await new packages().init()

  allPackages.entries().map(pkg => console.log(pkg[1].name))

  await Promise.all(
    allPackages.entries().map(async ([name, pkg]) => {
      await Promise.all(
        pkg.files.map(file => {
          return watchFile(file, watcher)
        }),
      )

      return true
    }),
  )
})()
