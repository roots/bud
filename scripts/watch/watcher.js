const execa = require('execa')

const fullRebuild = async () => {
  console.log('Cleaning and rebuilding everything.')

  const {stdout} = await execa('yarn', ['make'])
  stdout && console.log('Rebuilt from scratch.')
}

const watcher = async (event, file) => {
  console.log('Changes detectd. Rebuilding.')

  try {
    const {stdout} = await execa('yarn', ['build'])
    stdout && console.log('Done')
  } catch (err) {
    try {
      console.log(err)
      await fullRebuild()
    } catch (err) {
      console.log(err)
    }
  }

  return true
}

module.exports = watcher
