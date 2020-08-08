import WriteFilePlugin from 'write-file-webpack-plugin'
var writeFile = function () {
  return {
    make: function () {
      return new WriteFilePlugin()
    },
    when: function () {
      return true
    },
  }
}
export {writeFile}
//# sourceMappingURL=writeFile.js.map
