import WriteFilePlugin from 'write-file-webpack-plugin'

const writeFile = () => ({
  make: function () {
    return new WriteFilePlugin()
  },
  when: function () {
    return !this.bud.inProduction
  },
})

export {writeFile}
