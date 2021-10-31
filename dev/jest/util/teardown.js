/* eslint-disable no-console */
// @ts-check

const {blue} = require('chalk')
const {writeFile} = require('fs-extra')

module.exports = async () => {
  await Promise.all(
    global.examples.map(
      async ({name, manifest, manifestStr}) => {
        console.log(blue`\n${name} Restoring manifest`)
        try {
          await writeFile(manifest, manifestStr)
        } catch (err) {
          console.error(name, 'writeFile', err)
        }
      },
    ),
  )
}
