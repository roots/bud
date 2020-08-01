import WriteFilePlugin from 'write-file-webpack-plugin'

const writeFile = {
  make: function () {
    return new WriteFilePlugin()
  },
  when: function () {
    return true
  },
}

export {writeFile}
