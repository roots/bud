export async function read(path: string) {
  try {
    if (this.usingTsNode !== true) {
      this.usingTsNode = true
      const {register} = require('ts-node')
      register({transpileOnly: true})
      this.usingTsConfig = true
    }

    return require(path)
  } catch (error) {
    return this.error(error)
  }
}
